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
        console.log(req.body);
        res.status(400).json({"error": `config must be present`});
    }
    if (!req.body.seed) {
        console.log(req.body);
        res.status(400).json({"error": `seed must be present`});
    }
    const config = req.body.config;
    const cools = req.body.cools ?? null;
    const render = new Render(BASE_URL);
    const tmp = await Tmp.init();
    const attributes = await render.do(config, cools, 0, TimeConfig.for1024(), RenderConfig.for1024(), tmp);

    const gifUrl = await ipfs.upload(fs.readFileSync(tmp.gif.path));
    const gifMetadata = {
        "name": `WOW Summer Pools 10 Games Pass`,
        "description": `Visit (game website)[https://summer-pools.gurt.agency/10-games-pass] to redeem your 10 games!`,
        "image": 'https://wow-pools.infura-ipfs.io/ipfs/Qma9siALexELPvfXuYaXRCL6RqUFT83zuF7t9j5YHhgNeg',
        "external_url": `https://summer-pools.gurt.agency/10-games-pass`
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
