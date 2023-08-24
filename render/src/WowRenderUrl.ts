import RenderConfig from "./RenderConfig";
import TimeConfig from "./TimeConfig";
import {throwExpression} from "./utils";

const BASE_URL = process.env.URL ?? throwExpression("Please define URL");
export default class WowRenderUrl {
    static get(render: RenderConfig, time: TimeConfig, config: string, cools: string | null, overlay: number) {
        return `${BASE_URL}/render?size=${render.size}&slow=${time.slow}&config=${config}&cools=${cools}&overlay=${overlay}`;
    }
}
