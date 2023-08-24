import React from "react";
import Render from "./Render";
import Mint from "./Mint";
import {Polygon} from "../Chains/Polygon";
import ApeLuckyCoinSite from "./ApeLuckyCoinSite";
import {theme} from "./Theme";

export const apeLuckyCoinRoutes = [
    {
        path: "/",
        element: <ApeLuckyCoinSite><Polygon theme={theme}><Mint/></Polygon></ApeLuckyCoinSite>
    },
    {
        path: "/render",
        element: <Render/>
    },
];
