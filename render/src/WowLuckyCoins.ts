import Db from "./Utils/Db";


export interface WowLuckyCoin {
    tokenId: string;
    image: string;
}

export const wowLuckyCoin = async (tokenId: string): Promise<WowLuckyCoin | null> => {
    const client = await Db.get().connect();

    try {
        const result = await client.query('SELECT * FROM wow_lucky_coin WHERE "tokenId" = $1', [tokenId]);
        return result.rows[0] as any;
    } finally {
        client.release();
    }
};

export const allWowLuckyCoins = async (): Promise<WowLuckyCoin[]> => {
    const client = await Db.get().connect();

    try {
        const result = await client.query('SELECT * FROM wow_lucky_coin ORDER BY "tokenId"');
        return result.rows;
    } finally {
        client.release();
    }
};

export const addWowLuckyCoin = async (wowLuckyCoin: WowLuckyCoin) => {
    const client = await Db.get().connect();

    try {
        await client.query('BEGIN');

        const insertText = `
            INSERT INTO wow_lucky_coin("tokenId", image)
            VALUES ($1, $2)
            ON CONFLICT ("tokenId")
                DO NOTHING
        `;
        const insertValues = [wowLuckyCoin.tokenId, wowLuckyCoin.image];

        await client.query(insertText, insertValues);

        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};
