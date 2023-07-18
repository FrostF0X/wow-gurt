import * as ipfsClient from 'ipfs-http-client';
import * as fs from "fs";
import Tmp from "./Tmp";
import TimeConfig from "./TimeConfig";
import RenderConfig from "./RenderConfig";
import Render from "./Render";
import Server from "./Server";
import Sign from "./Sign";
import Contract from "./Contract";
import {clog} from "./utils";
import names from "./names";

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
const signer = new Sign(process.env.SERVER_PRIVATE_KEY ?? throwExpression("Please define SERVER_PRIVATE_KEY"));
const contract = new Contract(
    process.env.RPC_PROVIDER_URL ?? throwExpression("Please define RPC_PROVIDER_URL"),
    process.env.CONTRACT_ADDRESS ?? throwExpression("Please define CONTRACT_URL")
)
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
    const render = new Render(BASE_URL);
    const tmp = await Tmp.init();
    const attributes = await render.do(config, TimeConfig.for1024(), RenderConfig.for1024(), tmp);

    const gifBuffer = fs.readFileSync(tmp.gif.path);
    const gifResult = await ipfs.add(gifBuffer);
    const gifUrl = `${IPFS_PUBLIC_URL}/${gifResult.path}`;
    const newTokenId = await contract.getCurrentTokenId();
    const gifMetadata = {
        "name": `${names[newTokenId]}`,
        "description": `Glitchy new WOW generated with ${req.body.seed}`,
        "seed": `${req.body.seed}`,
        "image": gifUrl,
        "config": `${config}`,
        "attributes": attributes,
        "external_url": `${BASE_URL}/wow/${newTokenId}`
    };
    const metadataResult = await ipfs.add(Buffer.from(JSON.stringify(gifMetadata)));
    const metadataUrl = `${IPFS_PUBLIC_URL}/${metadataResult.path}`;
    clog(`Url: ${metadataUrl}`);
    res.json({metadata: gifMetadata, url: metadataUrl, signature: signer.sign(metadataUrl)});
    await tmp.clear();
})

