import React from "react";
import {Base} from "../Chains/Base";
import Site from "./Site";
import Preview from "./Preview";
import David from "./David";

export const wowArtGalleriesRoutes = [
    {
        path: "/",
        element: <Site><Base><Preview/></Base></Site>
    },
    {
        path: "/david",
        element: <Site><David/></Site>
    },
];
