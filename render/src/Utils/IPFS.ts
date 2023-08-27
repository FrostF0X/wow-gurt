import {throwExpression} from "../utils";
import * as ipfsClient from "ipfs-http-client";
import {IPFSHTTPClient} from "ipfs-http-client";

const WOW_INFURA_IPFS_API_KEY = process.env.WOW_INFURA_IPFS_API_KEY ?? throwExpression('Please define WOW_INFURA_IPFS_API_KEY');
const WOW_INFURA_IPFS_API_SECRET = process.env.WOW_INFURA_IPFS_API_SECRET ?? throwExpression('Please define WOW_INFURA_IPFS_API_SECRET');
const WOW_INFURA_IPFS_PUBLIC_URL: string = process.env.WOW_INFURA_IPFS_PUBLIC_URL ?? throwExpression("Please define WOW_INFURA_IPFS_PUBLIC_URL");
const POOLS_INFURA_IPFS_API_KEY = process.env.POOLS_INFURA_IPFS_API_KEY ?? throwExpression('Please define POOLS_INFURA_IPFS_API_KEY');
const POOLS_INFURA_IPFS_API_SECRET = process.env.POOLS_INFURA_IPFS_API_SECRET ?? throwExpression('Please define POOLS_INFURA_IPFS_API_SECRET');
const POOLS_INFURA_IPFS_PUBLIC_URL: string = process.env.POOLS_INFURA_IPFS_PUBLIC_URL ?? throwExpression("Please define POOLS_INFURA_IPFS_PUBLIC_URL");
const APE_LUCKY_COIN_INFURA_IPFS_API_KEY = process.env.APE_LUCKY_COIN_INFURA_IPFS_API_KEY ?? throwExpression('Please define APE_LUCKY_COIN_INFURA_IPFS_API_KEY');
const APE_LUCKY_COIN_INFURA_IPFS_API_SECRET = process.env.APE_LUCKY_COIN_INFURA_IPFS_API_SECRET ?? throwExpression('Please define APE_LUCKY_COIN_INFURA_IPFS_API_SECRET');
const APE_LUCKY_COIN_INFURA_IPFS_PUBLIC_URL: string = process.env.APE_LUCKY_COIN_INFURA_IPFS_PUBLIC_URL ?? throwExpression("Please define APE_LUCKY_COIN_INFURA_IPFS_PUBLIC_URL");
const WOW_LUCKY_COIN_INFURA_IPFS_API_KEY = process.env.WOW_LUCKY_COIN_INFURA_IPFS_API_KEY ?? throwExpression('Please define WOW_LUCKY_COIN_INFURA_IPFS_API_KEY');
const WOW_LUCKY_COIN_INFURA_IPFS_API_SECRET = process.env.WOW_LUCKY_COIN_INFURA_IPFS_API_SECRET ?? throwExpression('Please define WOW_LUCKY_COIN_INFURA_IPFS_API_SECRET');
const WOW_LUCKY_COIN_INFURA_IPFS_PUBLIC_URL: string = process.env.WOW_LUCKY_COIN_INFURA_IPFS_PUBLIC_URL ?? throwExpression("Please define WOW_LUCKY_COIN_INFURA_IPFS_PUBLIC_URL");


export class IPFS {
    private ipfs: IPFSHTTPClient;

    public static wow(): IPFS {
        return new IPFS(WOW_INFURA_IPFS_API_KEY, WOW_INFURA_IPFS_API_SECRET, WOW_INFURA_IPFS_PUBLIC_URL);
    }

    public static pools(): IPFS {
        return new IPFS(POOLS_INFURA_IPFS_API_KEY, POOLS_INFURA_IPFS_API_SECRET, POOLS_INFURA_IPFS_PUBLIC_URL);
    }

    public static apeLuckyCoin(): IPFS {
        return new IPFS(APE_LUCKY_COIN_INFURA_IPFS_API_KEY, APE_LUCKY_COIN_INFURA_IPFS_API_SECRET, APE_LUCKY_COIN_INFURA_IPFS_PUBLIC_URL);
    }

    public static wowLuckyCoin(): IPFS {
        return new IPFS(APE_LUCKY_COIN_INFURA_IPFS_API_KEY, APE_LUCKY_COIN_INFURA_IPFS_API_SECRET, APE_LUCKY_COIN_INFURA_IPFS_PUBLIC_URL);
    }

    constructor(apiKey: string, apiSecret: string, public readonly publicUrl: string) {
        this.ipfs = ipfsClient.create({
            host: 'ipfs.infura.io', port: 5001, protocol: 'https',
            headers: {
                authorization: 'Basic ' + Buffer.from(apiKey + ':' + apiSecret).toString('base64')
            }
        });
    }

    public async upload(file: Buffer) {
        const uploaded = await this.ipfs.add(file);
        return `${this.publicUrl}/${uploaded.path}`;
    }
}
