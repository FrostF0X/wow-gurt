import Db from "./Utils/Db";


export interface ApeLuckyCoin {
    tokenId: string;
    image: string;
}

export const apeLuckyCoin = async (tokenId: string): Promise<ApeLuckyCoin | null> => {
    const client = await Db.get().connect();

    try {
        const result = await client.query('SELECT * FROM ape_lucky_coin WHERE "tokenId" = $1', [tokenId]);
        return result.rows[0] as any;
    } finally {
        client.release();
    }
};

export const allApeLuckyCoins = async (): Promise<ApeLuckyCoin[]> => {
    const client = await Db.get().connect();

    try {
        const result = await client.query('SELECT * FROM ape_lucky_coin ORDER BY "tokenId"');
        return result.rows;
    } finally {
        client.release();
    }
};

export const addApeLuckyCoin = async (apeLuckyCoin: ApeLuckyCoin) => {
    const client = await Db.get().connect();

    try {
        await client.query('BEGIN');

        const insertText = `
            INSERT INTO ape_lucky_coin("tokenId", image)
            VALUES ($1, $2)
            ON CONFLICT ("tokenId")
                DO NOTHING
        `;
        const insertValues = [apeLuckyCoin.tokenId, apeLuckyCoin.image];

        await client.query(insertText, insertValues);

        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};
