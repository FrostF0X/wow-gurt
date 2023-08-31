import React, {Fragment} from 'react';
import ReactDOM from 'react-dom/client';
import './Common/Primitives'
import './styles/index.scss';
import './styles/Fonts.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import Render from "./Render";
import Mint from "./Mint";
import {Eth} from "./Chains/Eth";
import Preview from "./Preview";
import {getCookie} from "./Common/Cookie";
import {Multirender} from "./Multirender";
import Logo from "./Logo";
import Basics from "./Basics";
import Circus from "./Preview/Circus";
import Wows from "./Wows";
import {apeLuckyCoinRoutes} from "./ApeLuckyCoin/routes";
import {wowArtGalleriesRoutes} from "./WowArtGalleries/routes";
import {summerPoolsRoutes} from "./Pools/routes";
import {wowCryptoCityRoutes} from "./WowCryptoCity/routes";
import {wowLuckyCoinRoutes} from "./WowLuckyCoin/routes";


const wow = [
    {
        path: "/",
        element: <Eth><Mint/></Eth>,
    },
    {
        path: "/render",
        element: <Render/>,
    },
    {
        path: "/multirender",
        element: <Multirender/>,
    },
    {
        path: "/wow/:id",
        element: <Eth><Preview/></Eth>,
    },
    {
        path: "/wow/:id",
        element: <Eth><Preview/></Eth>,
    },
    {
        path: "/logo",
        element: <Basics><Logo size={400}/></Basics>
    },
    {
        path: "/circus",
        element: <Basics><Circus/></Basics>
    },
    {
        path: "/wows",
        element: <Wows/>,
    }
];

function resolveRoutesForDomain() {
    let parts = window.location.host.split(".");
    parts.pop();
    parts.pop();
    const subdomain = parts.join('.');
    if (subdomain === "summer-pools") {
        return summerPoolsRoutes;
    }
    if (subdomain === "ape-lucky-coin") {
        return apeLuckyCoinRoutes;
    }
    if (subdomain === "wow-lucky-coin") {
        return wowLuckyCoinRoutes;
    }
    if (subdomain === "wow-crypto-city") {
        return wowCryptoCityRoutes;
    }
    if (subdomain === "wow-art-galleries") {
        return wowArtGalleriesRoutes;
    }
    return wow;
}

const router = createBrowserRouter(resolveRoutesForDomain());

window.document.getElementsByTagName('body')[0].classList.add(getCookie('class'));
ReactDOM.createRoot(window.document.getElementById("root")).render(
    <Fragment>
        <RouterProvider router={router}/>
    </Fragment>
);

reportWebVitals();
