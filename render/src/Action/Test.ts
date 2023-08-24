import {Request, Response} from "express";
import Tmp from "../Tmp";
import Render from "../Render";
import TimeConfig from "../TimeConfig";
import RenderConfig from "../RenderConfig";
import WowRenderUrl from "../WowRenderUrl";

export const test = async (req: Request, res: Response) => {
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
    const overlay = parseInt(req.body.overlay) ?? 0;

    const tmp = await Tmp.init();
    const render = new Render();
    const renderConfig = RenderConfig.for1024();
    const time = TimeConfig.for1024();
    const url = WowRenderUrl.get(renderConfig, time, config, cools, overlay);
    await render.do(url, time, renderConfig, tmp);

    await new Promise((resolve, reject) => {
        res.sendFile(tmp.gif.path, function (error: any) {
            if (error) {
                reject(error);
            } else {
                resolve(true);
            }
        });
    });
    await tmp.clear();
};
