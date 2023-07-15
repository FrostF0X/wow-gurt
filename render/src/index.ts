import * as ipfsClient from 'ipfs-http-client';
import * as fs from "fs";
import Tmp from "./Tmp";
import TimeConfig from "./TimeConfig";
import RenderConfig from "./RenderConfig";
import Render from "./Render";
import Server from "./Server";

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
const PORT = process.env.PORT ? parseInt(process.env.PORT) : throwExpression("Please define URL");
Server.create("post", PORT, async (req, res) => {
    if (!req.body.seed || isNaN(parseInt(req.body.seed)) || parseInt(req.body.seed) < 0 || parseInt(req.body.seed) > Number.MAX_SAFE_INTEGER) {
        console.log(req.body);
        res.status(400).json({"error": "Seed must be preset"});
    }
    const seed = parseInt(req.body.seed);
    const render = new Render(BASE_URL);
    const tmp = await Tmp.init();
    await render.do(seed, TimeConfig.for1024(), RenderConfig.for1024(), tmp);

    const gifBuffer = fs.readFileSync(tmp.gif.path);
    const gifResult = await ipfs.add(gifBuffer);
    const gifUrl = `${IPFS_PUBLIC_URL}/${gifResult.path}`;
    const gifMetadata = {
        "name": `Wow ${seed}`,
        "description": `Wow ${seed}`,
        "image": gifUrl,
        "seed": seed,
    };
    const metadataResult = await ipfs.add(Buffer.from(JSON.stringify(gifMetadata)));
    const metadataUrl = `${IPFS_PUBLIC_URL}/${metadataResult.path}`
    res.json({url: metadataUrl});
    await tmp.clear();
})

