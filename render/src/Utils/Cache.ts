import {throwExpression} from "../utils";
import {MemoryCache} from "cache-manager";
import {redisStore} from "cache-manager-redis-yet";

const cacheManager = require('cache-manager');
const mongoStore = require('cache-manager-mongodb');

const REDIS_URL = process.env.REDIS_URL ?? throwExpression('Please define REDIS_URL');
export class Cache {
    private static c: Cache;

    constructor(private readonly cache: MemoryCache) {
    }

    public wrap<T>(key: string, fn: () => Promise<T>): Promise<T> {
        return this.cache.wrap(key, fn);
    }

    public static async get(): Promise<Cache> {
        if (!Cache.c) {
            Cache.c = new Cache(await cacheManager.caching(
                (await redisStore({
                    url: REDIS_URL,
                    ttl: 365 * 24 * 60 * 60 * 1000
                })))
            );
        }
        return Cache.c;
    }
}
