import React from "react";
import {Base} from "../Chains/Base";
import GallerySite from "./GallerySite";

export const galleryRoutes = [
    {
        path: "/",
        element: <GallerySite><Base></Base></GallerySite>
    },
];
