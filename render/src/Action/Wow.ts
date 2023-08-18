import {Request, Response} from "express";
import names from "../names";
import {addWow, wowExists} from "../Wows";
import Scaler from "../Scaler";

export const wow = async (req: Request, res: Response) => {
    let tokenId = parseInt(req.query.tokenId as string);
    let url = req.query.url as string;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();
    data = JSON.parse(JSON.stringify(data).replace(/\[token_id]/g, String(tokenId)).replace(/\[token_name]/g, names[tokenId]));
    res.json(data);
    if (await wowExists(String(tokenId))) {
        return;
    }
    await addWow({
        tokenId: String(tokenId),
        tokenUrl: url,
        image: data.image,
        image128: await Scaler.scale(data.image, 128),
        image256: await Scaler.scale(data.image, 256),
        image512: await Scaler.scale(data.image, 512),
        name: data.name,
        description: data.description,
        seed: data.seed,
        config: data.config
    });
};
