import Server, {Listener} from "./Server";
import {throwExpression} from "./utils";
import {wow} from "./Action/Wow";
import {render} from "./Action/Render";
import {test} from "./Action/Test";
import {max2SimultaneousRequests, rateLimitOnceA10Second} from "./Middleware/HighLoad";
import {pool} from "./Action/Pool";
import {wows} from "./Action/Wows";
import {summerPools10GamesPass} from "./Action/SummerPools10GamesPass";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : throwExpression("Please define URL");

Server.create(PORT, [
    new Listener('post', '/', render, [rateLimitOnceA10Second, max2SimultaneousRequests]),
    new Listener('post', '/test', test),
    new Listener('get', '/wow', wow),
    new Listener('get', '/wows', wows),
    new Listener('get', '/pool', pool),
    new Listener('get', '/wow-summer-pools/10-games-pass.json', summerPools10GamesPass),
]);
