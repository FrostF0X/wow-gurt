import React from "react";
import Render from "./Render";
import {Mint} from "./Mint";
import Site from "./Site";
import {theme} from "./Theme";
import {Base} from "../Chains/Base";

export const wowLuckyCoinRoutes = [
    {
        path: "/",
        element: <Site><Base theme={theme}><Mint/></Base></Site>
    },
    {
        path: "/render",
        element: <Render/>
    },
];
