import React from "react";
import Site from "./Site";
import David from "./David";
import Test from "./Test";
import Scroller from "./Scroller";

export const wowArtGalleriesRoutes = [
    {
        path: "/",
        element: <Site><Scroller/></Site>
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
