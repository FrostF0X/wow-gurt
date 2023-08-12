import rateLimit from "express-rate-limit";
import {Request, Response} from "express";

const queue = require("express-queue");


export const rateLimitOnceA10Second = rateLimit({
    windowMs: 10000,
    max: 1,
    message: 'Only one nft generation attempt per 10s allowed',
    skip: (req) => req.path === '/ping' || req.path === '/wow',
    skipFailedRequests: true,
    legacyHeaders: true,
    handler: (_: Request, r: Response) => r.status(429).json({"error": "Only one nft generation attempt per 10s allowed"}).end()
});
export const max2SimultaneousRequests = queue({
    activeLimit: 2,
    queuedLimit: 1,
    rejectHandler: (_: Request, r: Response) => r.status(429).json({"error": "Server is busy"}).end()
});
