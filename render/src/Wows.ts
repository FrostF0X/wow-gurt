import {Pool} from 'pg';
import Db from "./Utils/Db";
export interface Wow {
    tokenId: string;
    tokenUrl: string;
    image: string;
    image128: string;
    image256: string;
    image512: string;
    name: string;
    description: string;
    seed: string;
    config: string;
}


export const wowExists = async (tokenId: string) => {
    const client = await Db.get().connect();

    try {
        const result = await client.query('SELECT EXISTS(SELECT 1 FROM wow WHERE "tokenId" = $1)', [tokenId]);
        return result.rows[0].exists;
    } finally {
        client.release();
    }
};

export const allWows = async (): Promise<Wow[]> => {
    const client = await Db.get().connect();

    try {
        const result = await client.query('SELECT * FROM wow ORDER BY "tokenId"');
        return result.rows;
    } finally {
        client.release();
    }
};

export const addWow = async (wow: Wow) => {
    const client = await Db.get().connect();

    try {
        await client.query('BEGIN');

        const insertText = `
            INSERT INTO wow("tokenId", "tokenUrl", image, image128, image256, image512, name, description, seed,
                            config)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            ON CONFLICT ("tokenId")
                DO NOTHING
        `;
        const insertValues = [wow.tokenId, wow.tokenUrl, wow.image, wow.image128, wow.image256, wow.image512, wow.name, wow.description, wow.seed, wow.config];

        await client.query(insertText, insertValues);

        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};
