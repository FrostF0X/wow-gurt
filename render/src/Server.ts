import * as express from "express";
import {Request, Response} from "express";
import rateLimit from "express-rate-limit";
import * as cors from "cors";
import {cerror, clog, errorInfo} from "./utils";

const queue = require("express-queue");

export default class Server {
    static create(type: "get" | "post", port: number, listener: (req: Request, res: Response) => Promise<void>) {
        const app: express.Express = express();
        app.use(queue({
            activeLimit: 2,
            queuedLimit: 2,
            rejectHandler: (_: Request, r: Response) => r.status(429).json({"error": "Server is busy generating other nfts"}).end()
        }));
        app.use(rateLimit({
            windowMs: 120000,
            max: 1,
            message: 'Only one nft generation attempt per 2 minutes allowed',
            skipFailedRequests: true,
            legacyHeaders: true,
            handler: (_: Request, r: Response) => r.status(429).json({"error": "Only one nft generation attempt per 2 minutes allowed"}).end()
        }));
        app.use(express.json()); // for parsing application/json
        app.use(cors({
            origin: '*'
        }));

        if (type === "get") {
            app.get('/', async (req, res) => {
                try {
                    await listener(req, res);
                    clog("Done.");
                } catch (error) {
                    cerror(`Error: ${errorInfo(error)}`);
                    res.status(500).contentType('application/json').json({"error": errorInfo(error)}).end();
                }
            });
        } else {
            app.post('/', listener);
        }
        app.listen(port, () => {
            clog(`Server is listening on port ${port}`);
        });
    }
}
