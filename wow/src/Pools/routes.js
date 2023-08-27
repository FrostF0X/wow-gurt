import {Base} from "../Chains/Base";
import Pools from "./Pools";
import Basics from "../Basics";
import PoolsCelebsPreview from "./PoolsCelebsPreview";
import React from "react";
import Site from "./Site";

export const summerPoolsRoutes = [
    {
        path: "/",
        element: <Site><Base><Pools/></Base></Site>
    },
    {
        path: "/celebs",
        element: <Basics><PoolsCelebsPreview/></Basics>
    }
];
