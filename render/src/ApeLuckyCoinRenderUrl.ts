import RenderConfig from "./RenderConfig";
import TimeConfig from "./TimeConfig";
import {throwExpression} from "./utils";

const APE_LUCKY_COIN_URL = process.env.APE_LUCKY_COIN_BASE_URL ?? throwExpression("Please define APE_LUCKY_COIN_BASE_URL");
export default class ApeLuckyCoinRenderUrl {
    static get(render: RenderConfig, time: TimeConfig, tokenId: string) {
        return `${APE_LUCKY_COIN_URL}/render?size=${render.size}&slow=${time.slow}&tokenId=${tokenId}`;
    }
}
