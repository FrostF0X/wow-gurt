import * as express from "express";
import {Request, Response} from "express";
import * as cors from "cors";
import {cerror, clog, errorInfo} from "./utils";
import names from "./names";
import rateLimit from "express-rate-limit";

const queue = require("express-queue");

export default class Server {
    static create(type: "get" | "post", port: number, listener: (req: Request, res: Response) => Promise<void>) {
        const app: express.Express = express();
        app.options('*', cors())
        app.use(cors({
            credentials: true,
            exposedHeaders: ['Content-Type', 'Depth', 'User-Agent', 'X-File-Size', 'X-Requested-With', 'If-Modified-Since', 'X-File-Name', 'Cache-Control'],
            origin: '*'
        }));
        app.use(queue({
            activeLimit: 2,
            queuedLimit: 1,
            rejectHandler: (_: Request, r: Response) => r.status(429).json({"error": "Server is busy generating other nfts"}).end()
        }));
        app.use(rateLimit({
            windowMs: 10000,
            max: 1,
            message: 'Only one nft generation attempt per 10s allowed',
            skip: (req) => req.path === '/ping' || req.path === '/wow',
            skipFailedRequests: true,
            legacyHeaders: true,
            handler: (_: Request, r:  Response) => r.status(429).json({"error": "Only one nft generation attempt per 10s allowed"}).end()
        }));
        app.use(rateLimit({
            windowMs: 60 * 60 * 1000,
            max: 50,
            message: 'Looks like you are spamming us.',
            skip: (req) => req.path === '/ping' || req.path === '/wow',
            skipFailedRequests: true,
            legacyHeaders: true,
            handler: (_: Request, r: Response) => r.status(429).json({"error": "Looks like you are spamming us."}).end()
        }));
        app.use(express.json()); // for parsing application/json

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

        app.get('/wow', async (req, res) => {
            console.log("Processing request");
            let tokenId = parseInt(req.query.tokenId as string);
            const response = await fetch(req.query.url as string);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            let data = await response.json();

            data = JSON.parse(JSON.stringify(data).replace(/\[token_id]/g, String(tokenId)).replace(/\[token_name]/g, names[tokenId]));
            res.json(data);
        })
        app.get('/ping', (req, res) => res.json({"pong": true}));
        app.listen(port, () => {
            clog(`Server is listening on port ${port}`);
        });
    }
}
