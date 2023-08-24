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
import Pools from "./Pools/Pools";
import Wows from "./Wows";
import PoolsCelebsPreview from "./Pools/PoolsCelebsPreview";
import {Base} from "./Chains/Base";
import {apeLuckyCoinRoutes} from "./ApeLuckyCoin/routes";


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
const pools = [
    {
        path: "/",
        element: <Base><Pools/></Base>
    },
    {
        path: "/celebs",
        element: <Basics><PoolsCelebsPreview/></Basics>
    }
];

function resolveRoutesForDomain() {
    let subdomain = window.location.host.split(".")[0];
    if (subdomain === "summer-pools") {
        return pools;
    }
    if (subdomain === "ape-lucky-coin") {
        return apeLuckyCoinRoutes;
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
