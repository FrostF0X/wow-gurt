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

const router = createBrowserRouter([
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
            element: <Base><Preview/></Base>,
        },
        {
            path: "/logo",
            element: <Basics><Logo size={400}/></Basics>
        },
        {
            path: "/circus",
            element: <Basics><Circus/></Basics>
        }
    ]
);

document.getElementsByTagName('body')[0].classList.add(getCookie('class'));

ReactDOM.createRoot(document.getElementById("root")).render(
    <Fragment>
        <RouterProvider router={router}/>
    </Fragment>
);

reportWebVitals();
