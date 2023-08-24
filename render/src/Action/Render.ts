import {Request, Response} from "express";
import Render from "../Render";
import Tmp from "../Tmp";
import TimeConfig from "../TimeConfig";
import RenderConfig from "../RenderConfig";
import {clog, throwExpression} from "../utils";
import * as fs from "fs";
import Sign from "../Sign";
import {ethers} from "ethers";
import {IPFS} from "../Utils/IPFS";
import WowRenderUrl from "../WowRenderUrl";

const BASE_URL = process.env.URL ?? throwExpression("Please define URL");
const PROXY_URL = process.env.PROXY_URL ?? throwExpression("Please define PROXY_URL");

const ipfs = IPFS.wow();

function urlWithProxy(baseMetadataUrl: string) {
    const params = new URLSearchParams();
    params.set('url', baseMetadataUrl);
    return `${PROXY_URL}?${params.toString()}`;
}

function encodeInput(metadataUrl: string) {
    const abiCoder = new ethers.AbiCoder();
    return abiCoder.encode(['string'], [metadataUrl]);
}

const signer = new Sign(process.env.SERVER_PRIVATE_KEY ?? throwExpression("Please define SERVER_PRIVATE_KEY"));

export const render = async (req: Request, res: Response) => {
    if (!req.body.config) {
        res.status(400).json({"error": `config must be present`});
        return;
    }
    if (!req.body.seed) {
        res.status(400).json({"error": `seed must be present`});
        return;
    }
    const config = req.body.config;
    const cools = req.body.cools ?? null;
    const render = new Render();
    const tmp = await Tmp.init();
    const renderConfig = RenderConfig.for1024();
    const time = TimeConfig.for1024();
    const url = WowRenderUrl.get(renderConfig, time, config, cools, 0);
    const attributes = await render.do(url, time, renderConfig, tmp);

    const gifUrl = await ipfs.upload(fs.readFileSync(tmp.gif.path));
    const gifMetadata = {
        "name": `#[token_id] [token_name]`,
        "description": `Glitchy new WOW generated with: #[token_id] ${req.body.seed}`,
        "seed": `${req.body.seed}`,
        "image": gifUrl,
        "config": `${config}`,
        "attributes": attributes,
        "external_url": `${BASE_URL}/wow/[token_id]`
    };
    const metadataUrl = urlWithProxy(await ipfs.upload(Buffer.from(JSON.stringify(gifMetadata))));
    const input = encodeInput(metadataUrl);
    let response = {
        metadata: gifMetadata,
        url: metadataUrl,
        signature: signer.sign(input),
        input: input
    };
    res.json(response);
    clog(`Url: ${JSON.stringify(response)}`);
    await tmp.clear();
};
