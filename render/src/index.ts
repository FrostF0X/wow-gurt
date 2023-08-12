import Server, {Listener} from "./Server";
import {throwExpression} from "./utils";
import {wow} from "./Action/Wow";
import {render} from "./Action/Render";
import {test} from "./Action/Test";
import {max2SimultaneousRequests, rateLimitOnceA10Second} from "./Middleware/HighLoad";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : throwExpression("Please define URL");

Server.create(PORT, [
    new Listener('post', '/', render, [rateLimitOnceA10Second, max2SimultaneousRequests]),
    new Listener('get', '/test', test),
    new Listener('get', '/wow', wow),
]);
