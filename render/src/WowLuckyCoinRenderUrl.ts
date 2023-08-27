import RenderConfig from "./RenderConfig";
import TimeConfig from "./TimeConfig";
import {throwExpression} from "./utils";

const WOW_LUCKY_COIN_URL = process.env.WOW_LUCKY_COIN_BASE_URL ?? throwExpression("Please define WOW_LUCKY_COIN_BASE_URL");
export default class WowLuckyCoinRenderUrl {
    static get(render: RenderConfig, time: TimeConfig, tokenId: string) {
        return `${WOW_LUCKY_COIN_URL}/render?size=${render.size}&slow=${time.slow}&tokenId=${tokenId}`;
    }
}
