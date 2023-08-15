import {Request, Response} from "express";
import * as sharp from "sharp";
import {file, FileResult} from "tmp-promise";
import {Duck, Pool, Pools, Random} from "./Pools/Pools";
import {IPFS} from "../Utils/IPFS";
import * as fs from "fs";
import {Cache} from "../Utils/Cache";

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

async function render(conf: Pools, guys: string[], random: Random, occupiedPools: Pool[], tmp: FileResult) {
    await new Promise(async (resolve, reject) => {
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
}

export const pool = async (req: Request, res: Response) => {
    if (!req.query.guys || typeof req.query.guys !== "string") {
        console.log(req.body);
        res.status(400).json({"error": `guys must be present`});
    }
    if (!req.query.seed || typeof req.query.seed !== "string") {
        console.log(req.body);
        res.status(400).json({"error": `seed must be present`});
    }
    const seed = req.query.test === 'true' ? Math.ceil(Math.random() * 10000) : parseInt(req.query.seed as any);
    const guys = (req.query.guys) ? (req.query.guys as any).split(',') : [];
    const tmp = await file({postfix: '.png'});
    const conf = Pools.generate(seed);
    const random = Random.fresh(seed);
    const occupiedPools = random.randomItems(conf.pools, guys.length);
    if (req.query.test === 'true') {
        await render(conf, guys, random, occupiedPools, tmp);
        await new Promise((resolve, reject) => {
            res.sendFile(tmp.path, function (error: any) {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
        return;
    }
    const metadata = await (await Cache.get()).wrap(`[${seed}]-[${guys.join('-')}]`, async () => {
        await render(conf, guys, random, occupiedPools, tmp);
        const rendered = await ipfs.upload(await fs.promises.readFile(tmp.path));
        return {
            "name": `#${seed}`,
            "description": `Your awesome Pool ${seed}`,
            "seed": `${seed}`,
            "image": rendered,
        };
    });
    res.json(metadata);
    await tmp.cleanup();
};
