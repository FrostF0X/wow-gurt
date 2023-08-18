import {Pool} from "pg";
export default class Db {
    static get(): Pool {
        return new Pool({
            connectionString: process.env.POSTGRES_URL
        });
    }
}
