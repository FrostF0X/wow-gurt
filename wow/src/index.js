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
            path: "/wow/:id",
            element: <Config><Preview/></Config>,
        }
    ]
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Fragment>
        <RouterProvider router={router}/>
    </Fragment>
);

reportWebVitals();
