import React from "react";
import {Base} from "../Chains/Base";
import Site from "./Site";
import Preview from "./Preview";

export const galleryRoutes = [
    {
        path: "/",
        element: <Site><Base><Preview/></Base></Site>
    },
];
