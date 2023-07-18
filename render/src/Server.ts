import * as express from "express";
import {Request, Response} from "express";
import * as cors from "cors";
import {cerror, clog, errorInfo} from "./utils";
import rateLimit from "express-rate-limit";

const queue = require("express-queue");

export default class Server {
    static create(type: "get" | "post", port: number, listener: (req: Request, res: Response) => Promise<void>) {
        const app: express.Express = express();
        app.use(queue({
            activeLimit: 2,
            queuedLimit: 1,
            rejectHandler: (_: Request, r: Response) => r.status(429).json({"error": "Server is busy generating other nfts"}).end()
        }));
        app.use(rateLimit({
            windowMs: 60000,
            max: 1,
            message: 'Only one nft generation attempt per minute allowed',
            skip: (req) => req.path === '/ping',
            skipFailedRequests: true,
            legacyHeaders: true,
            handler: (_: Request, r: Response) => r.status(429).json({"error": "Only one nft generation attempt per 2 minutes allowed"}).end()
        }));
        app.use(express.json()); // for parsing application/json
        app.options('*', cors())
        app.use(cors({
            credentials: true,
            exposedHeaders: ['Content-Type', 'Depth', 'User-Agent', 'X-File-Size', 'X-Requested-With', 'If-Modified-Since', 'X-File-Name', 'Cache-Control'],
            origin: '*'
        }));

        function wrapped() {
            return async (req: Request, res: Response) => {
                try {
                    await listener(req, res);
                    clog("Done.");
                } catch (error) {
                    cerror(`Error: ${errorInfo(error)}`);
                    res.status(500).contentType('application/json').json({"error": errorInfo(error)}).end();
                }
            };
        }

        if (type === "get") {
            app.get('/', wrapped());
        } else {
            app.post('/', wrapped());
        }
        app.get('/ping', (req, res) => res.json({"pong": true}));
        app.listen(port, () => {
            clog(`Server is listening on port ${port}`);
        });
    }
}
