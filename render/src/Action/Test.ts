import {Request, Response} from "express";
import Tmp from "../Tmp";
import Render from "../Render";
import TimeConfig from "../TimeConfig";
import RenderConfig from "../RenderConfig";
import {throwExpression} from "../utils";

const BASE_URL = process.env.URL ?? throwExpression("Please define URL");

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
    const render = new Render(BASE_URL);
    await render.do(config, cools, overlay, TimeConfig.for1024(), RenderConfig.for1024(), tmp);

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
