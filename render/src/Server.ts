import * as express from "express";
import {Request, Response} from "express";
import * as cors from "cors";
import {cerror, clog, errorInfo} from "./utils";

export class Listener {

    constructor(public readonly method: 'get' | 'post', public readonly path: string, public callback: (req: Request, res: Response) => Promise<void>, public middlewares: ((req: Request, res: Response) => Promise<void>)[] = []) {
    }
}

export default class Server {
    static create(port: number, listeners: Listener[]) {
        const app: express.Express = express();
        app.options('*', cors())
        app.use(cors({
            credentials: true,
            exposedHeaders: ['Content-Type', 'Depth', 'User-Agent', 'X-File-Size', 'X-Requested-With', 'If-Modified-Since', 'X-File-Name', 'Cache-Control'],
            origin: '*'
        }));
        app.use(express.json()); // for parsing application/json

        function wrapped(wr: (req: Request, res: Response) => Promise<void>) {
            return async (req: Request, res: Response) => {
                try {
                    clog(`Starting: ${req.path}`);
                    await wr(req, res);
                    clog("Done.");
                } catch (error) {
                    cerror(`Error: ${errorInfo(error)}`);
                    res.status(500).contentType('application/json').json({"error": errorInfo(error)}).end();
                }
            };
        }

        listeners.forEach((l: Listener) => {
            if (l.method === 'post') {
                app.post(l.path, ...l.middlewares, wrapped(l.callback));
            } else {
                app.get(l.path, ...l.middlewares, wrapped(l.callback));
            }
        })


        app.get('/ping', (req, res) => res.json({"pong": true}));
        app.listen(port, () => {
            clog(`Server is listening on port ${port}`);
        });
    }
}
