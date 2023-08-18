import {Request, Response} from "express";
import {allWows} from "../Wows";

export const wows = async (req: Request, res: Response) => {
    res.json(await allWows());
};
