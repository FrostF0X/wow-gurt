import {Request, Response} from "express";

export const image = async (req: Request, res: Response) => {
    const image = req.params.url as any;
    return image;
};
