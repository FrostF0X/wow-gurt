import React from "react";
import {Base} from "../Chains/Base";
import Site from "./Site";
import Preview from "./Preview";

export const wowArtGalleriesRoutes = [
    {
        path: "/",
        element: <Site><Base><Preview/></Base></Site>
    },
];
