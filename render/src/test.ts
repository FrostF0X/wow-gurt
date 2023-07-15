import Tmp from "./Tmp";
import TimeConfig from "./TimeConfig";
import RenderConfig from "./RenderConfig";
import Render from "./Render";
import Server from "./Server";

function throwExpression(errorMessage: string): never {
    throw new Error(errorMessage);
}

const BASE_URL = process.env.URL ?? throwExpression("Please define URL");
const PORT = process.env.PORT ? parseInt(process.env.PORT) : throwExpression("Please define URL");
Server.create("get", PORT, async (req, res) => {
    const tmp = await Tmp.init();
    const seed = req.query.seed ? parseInt(req.query.seed as string) : Math.round(Math.random() * 10000);
    const render = new Render(BASE_URL);
    await render.do(seed, TimeConfig.for1024(), RenderConfig.for1024(), tmp);

    await new Promise((resolve, reject) => {
        res.sendFile(tmp.gif.path, function (error) {
            if (error) {
                reject(error);
            } else {
                resolve(true);
            }
        })
    });
    await tmp.clear();
})
