import React from "react";
import {Base} from "../Chains/Base";
import Site from "./Site";
import David from "./David";
import {theme} from "./Theme";
import City from "./City";
import Test from "./Test";

export const wowArtGalleriesRoutes = [
    {
        path: "/",
        element: <Site><Base theme={theme}><City/></Base></Site>
    },
    {
        path: "/david",
        element: <Site><David/></Site>
    },
    {
        path: "/test",
        element: <Site><Test/></Site>
    },
];
