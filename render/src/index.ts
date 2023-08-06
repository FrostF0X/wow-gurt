import * as ipfsClient from 'ipfs-http-client';
import * as fs from "fs";
import Tmp from "./Tmp";
import TimeConfig from "./TimeConfig";
import RenderConfig from "./RenderConfig";
import Render from "./Render";
import Server from "./Server";
import Sign from "./Sign";
import {clog} from "./utils";
import {ethers} from "ethers";

function throwExpression(errorMessage: string): never {
    throw new Error(errorMessage);
}

const INFURA_IPFS_API_KEY = process.env.INFURA_IPFS_API_KEY ?? throwExpression('Please define INFURA_IPFS_API_KEY');
const INFURA_IPFS_API_SECRET = process.env.INFURA_IPFS_API_SECRET ?? throwExpression('Please define INFURA_IPFS_API_SECRET');
const IPFS_PUBLIC_URL: string = process.env.INFURA_IPFS_PUBLIC_URL ?? throwExpression("Please define INFURA_IPFS_PUBLIC_URL");
const ipfs = ipfsClient.create({
    host: 'ipfs.infura.io', port: 5001, protocol: 'https',
    headers: {
        authorization: 'Basic ' + Buffer.from(INFURA_IPFS_API_KEY + ':' + INFURA_IPFS_API_SECRET).toString('base64')
    }
});

const BASE_URL = process.env.URL ?? throwExpression("Please define URL");
const PROXY_URL = process.env.PROXY_URL ?? throwExpression("Please define PROXY_URL");
const PORT = process.env.PORT ? parseInt(process.env.PORT) : throwExpression("Please define URL");
const signer = new Sign(process.env.SERVER_PRIVATE_KEY ?? throwExpression("Please define SERVER_PRIVATE_KEY"));

function encodeInput(metadataUrl: string) {
    const abiCoder = new ethers.AbiCoder();
    return abiCoder.encode(['string'], [metadataUrl]);
}

function queryParams(baseMetadataUrl: string) {
    const params = new URLSearchParams();
    params.set('url', baseMetadataUrl);
    return `${PROXY_URL}?${params.toString()}`;
}

Server.create("post", PORT, async (req, res) => {
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
    const attributes = await render.do(config, cools, TimeConfig.for1024(), RenderConfig.for1024(), tmp);

    const gifBuffer = fs.readFileSync(tmp.gif.path);
    const gifResult = await ipfs.add(gifBuffer);
    const gifUrl = `${IPFS_PUBLIC_URL}/${gifResult.path}`;
    const gifMetadata = {
        "name": `#[token_id] [token_name]`,
        "description": `Glitchy new WOW generated with: #[token_id] ${req.body.seed}`,
        "seed": `${req.body.seed}`,
        "image": gifUrl,
        "config": `${config}`,
        "attributes": attributes,
        "external_url": `${BASE_URL}/wow/[token_id]`
    };
    const metadataResult = await ipfs.add(Buffer.from(JSON.stringify(gifMetadata)));
    const baseMetadataUrl = `${IPFS_PUBLIC_URL}/${metadataResult.path}`;
    const metadataUrl = queryParams(baseMetadataUrl);
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
}, async (req, res) => {
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

    const tmp = await Tmp.init();
    const render = new Render(BASE_URL);
    await render.do(config, cools, TimeConfig.for1024(), RenderConfig.for1024(), tmp);

    await new Promise((resolve, reject) => {
        res.sendFile(tmp.gif.path, function (error) {
            if (error) {
                reject(error);
            } else {
                resolve(true);
            }
        });
    });
    await tmp.clear();
})

