import React from "react";
import Render from "./Render";
import {Mint} from "./Mint";
import WowLuckyCoinSite from "./WowLuckyCoinSite";
import {theme} from "./Theme";
import {Base} from "../Chains/Base";

export const wowLuckyCoinRoutes = [
    {
        path: "/",
        element: <WowLuckyCoinSite><Base theme={theme}><Mint/></Base></WowLuckyCoinSite>
    },
    {
        path: "/render",
        element: <Render/>
    },
];
