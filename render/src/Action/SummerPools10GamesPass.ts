import {Request, Response} from "express";

export const summerPools10GamesPass = async (req: Request, res: Response) => {
    res.json({
        "name": "WOW Summer Pools 10 Games Pass",
        "description": "Visit (WOW Summer Pools Website)[https://summer-pools.gurt.agency/10-games-pass] to redeem your 10 games!",
        "image": "https://wow-pools.infura-ipfs.io/ipfs/Qma9siALexELPvfXuYaXRCL6RqUFT83zuF7t9j5YHhgNeg",
        "external_url": "https://summer-pools.gurt.agency/10-games-pass"
    });
};
