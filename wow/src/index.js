import React, {Fragment} from 'react';
import ReactDOM from 'react-dom/client';
import './Common/Primitives'
import './styles/index.scss';
import './styles/Fonts.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import Render from "./Render";
import Mint from "./Mint";
import {Config} from "./Eth/Config";
import Preview from "./Preview";
import {getCookie} from "./Common/Cookie";
import {Multirender} from "./Multirender";
import Logo from "./Logo";
import Basics from "./Basics";

const router = createBrowserRouter([
        {
            path: "/",
            element: <Config><Mint/></Config>,
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
            element: <Config><Preview/></Config>,
        },
        {
            path: "/logo",
            element: <Basics><Logo size={400}/></Basics>
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
