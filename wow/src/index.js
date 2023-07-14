import React, {Fragment} from 'react';
import ReactDOM from 'react-dom/client';
import './Common/Primitives'
import './styles/index.scss';
import './styles/Fonts.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import Render from "./Render";
import {App} from "./App";

const router = createBrowserRouter([
        {
            path: "/",
            element: <App/>,
        },
        {
            path: "/render",
            element: <Render/>,
        }
    ]
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Fragment>
        <RouterProvider router={router}/>
    </Fragment>
);

reportWebVitals();
