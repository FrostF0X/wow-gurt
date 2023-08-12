import {Request, Response} from "express";
import names from "../names";

export const wow = async (req: Request, res: Response) => {
    let tokenId = parseInt(req.query.tokenId as string);
    const response = await fetch(req.query.url as string);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();

    data = JSON.parse(JSON.stringify(data).replace(/\[token_id]/g, String(tokenId)).replace(/\[token_name]/g, names[tokenId]));
    res.json(data);
};
