import {Request, Response} from "express";
import * as sharp from "sharp";
import {file} from "tmp-promise";
import {Duck, Pool, Pools, Random} from "./Pools/Pools";
import {IPFS} from "../Utils/IPFS";
import * as fs from "fs";

const backgroundPath = `${__dirname}/Pools/assets/background.png`;
const leavesPath = `${__dirname}/Pools/assets/leaves.png`;
const poolsPath = `${__dirname}/Pools/assets/pools`;
const ducksPath = `${__dirname}/Pools/assets/ducks`;
const guysPath = `${__dirname}/Pools/assets/guys`;
const poolPath = (pool: Pool) => `${poolsPath}/${pool.type}/${pool.colors}.png`;
const duckPath = (duck: Duck) => `${ducksPath}/${duck.number}.png`;
const guyPath = (guy: string, direction: string) => `${guysPath}/${guy}-${direction}.png`;
const ipfs = IPFS.pools();

function isNumeric(value: string) {
    return /^-?\d+$/.test(value);
}

export const pool = async (req: Request, res: Response) => {
    if (!req.query.guys || typeof req.query.seed !== "string") {
        console.log(req.body);
        res.status(400).json({"error": `config must be present`});
    }
    if (!req.query.seed || typeof req.query.seed !== "string") {
        console.log(req.body);
        res.status(400).json({"error": `seed must be present`});
    }
    const seed = parseInt(req.query.seed as any);
    const guys = (req.query.guys) ? (req.query.guys as any).split(',') : [];
    const tmp = await file({postfix: '.png'});
    const conf = Pools.generate(seed);
    const random = Random.fresh(seed);
    const occupiedPools = random.randomItems(conf.pools, guys.length);
    await new Promise((resolve, reject) => {
        sharp(backgroundPath).composite([...conf.pools.map(p => ({
            input: poolPath(p),
            top: Math.ceil(p.y),
            left: Math.ceil(p.x),
        })), ...conf.ducks.map(d => ({
            input: duckPath(d),
            top: Math.ceil(d.y),
            left: Math.ceil(d.x),
        })), ...guys.map((g: string, i: number) => ({
            input: guyPath(g, random.bool() ? 'left' : 'right'),
            top: occupiedPools[i].y - 200,
            left: occupiedPools[i].x
        })), {
            input: leavesPath,
            top: 0,
            left: 0
        }]).toFile(tmp.path, (err, info) => {
            if (err) {
                reject(err);
            } else {
                resolve(info);
            }
        });
    });
    const rendered = await ipfs.upload(await fs.promises.readFile(tmp.path));
    const metadata = {
        "name": `#${seed}`,
        "description": `Your awesome Pool ${seed}`,
        "seed": `${seed}`,
        "image": rendered,
    };
    res.json(metadata);
    await tmp.cleanup();
};
