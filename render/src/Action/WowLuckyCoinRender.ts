import {Request, Response} from "express";
import Render from "../Render";
import Tmp from "../Tmp";
import TimeConfig from "../TimeConfig";
import RenderConfig from "../RenderConfig";
import {clog, throwExpression} from "../utils";
import * as fs from "fs";
import {IPFS} from "../Utils/IPFS";
import ApeLuckyCoinRenderUrl from "../ApeLuckyCoinRenderUrl";
import {addApeLuckyCoin, apeLuckyCoin} from "../ApeLuckyCoins";

const WOW_LUCKY_COIN_BASE_URL = process.env.URL ?? throwExpression("Please define WOW_LUCKY_COIN_BASE_URL");

const ipfs = IPFS.apeLuckyCoin();

function response(tokenId: string, gifUrl: string) {
    return {
        "name": `#[${tokenId}]`,
        "description": `WOW City Lucky Coin`,
        "image": gifUrl,
        "external_url": `${WOW_LUCKY_COIN_BASE_URL}/coin/${tokenId}`
    };
}

export const renderWowLuckyCoin = async (req: Request, res: Response) => {
    const tokenId = req.params.tokenId as any;
    if (!req.params.tokenId) {
        console.log(req.params.tokenId);
        res.status(400).json({"error": `token id must be present`});
    }
    const generated = await apeLuckyCoin(tokenId);
    if (generated) {
        res.json(response(tokenId, generated.image));
        return;
    }
    const render = new Render();
    const tmp = await Tmp.init();
    const time = TimeConfig.apeLuckyCoin(18.25, 5000);
    const config = RenderConfig.apeLuckyCoin();
    const url = ApeLuckyCoinRenderUrl.get(config, time, tokenId);
    await render.do(url, time, config, tmp);
    const image = await ipfs.upload(fs.readFileSync(tmp.gif.path));
    await addApeLuckyCoin({tokenId, image});
    res.json(response(tokenId, image));
    clog(`Url: ${JSON.stringify(image)}`);
    clog(JSON.stringify(tmp));
    await tmp.clear();
};
