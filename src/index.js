import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/survey.css';
import Home from './Home';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ScrumSurvey from "./ScrumSurvey";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/survey",
        element: <ScrumSurvey/>,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <div className="App">
            <header className="App-header">
                <img src="/open-scrum-banner-big.png" alt=""
                     className={"body-frame-banner body-frame-banner-border body-frame-banner-top"}/>
                <img src="/open-scrum-banner-big.png" alt=""
                     className={"body-frame-banner body-frame-banner-corner body-frame-banner-top-left-corner-0"}/>
                <img src="/open-scrum-banner-big.png" alt=""
                     className={"body-frame-banner body-frame-banner-corner body-frame-banner-top-left-corner-1"}/>
                <img src="/open-scrum-banner-big.png" alt=""
                     className={"body-frame-banner body-frame-banner-corner body-frame-banner-top-left-corner-2"}/>
                <img src="/open-scrum-banner-big-left.png" alt=""
                     className={"body-frame-banner body-frame-banner-border body-frame-banner-left"}/>
                <img src="/open-scrum-banner-big.png" alt=""
                     className={"body-frame-banner body-frame-banner-corner body-frame-banner-top-right-corner-0"}/>
                <img src="/open-scrum-banner-big.png" alt=""
                     className={"body-frame-banner body-frame-banner-corner body-frame-banner-top-right-corner-1"}/>
                <img src="/open-scrum-banner-big.png" alt=""
                     className={"body-frame-banner body-frame-banner-corner body-frame-banner-top-right-corner-2"}/>
                <img src="/open-scrum-banner-big-right.png" alt=""
                     className={"body-frame-banner body-frame-banner-border body-frame-banner-right"}/>
                <img src="/open-scrum-banner-big.png" alt=""
                     className={"body-frame-banner body-frame-banner-corner body-frame-banner-bottom-left-corner-0"}/>
                <img src="/open-scrum-banner-big.png" alt=""
                     className={"body-frame-banner body-frame-banner-corner body-frame-banner-bottom-left-corner-1"}/>
                <img src="/open-scrum-banner-big.png" alt=""
                     className={"body-frame-banner body-frame-banner-corner body-frame-banner-bottom-left-corner-2"}/>
                <img src="/open-scrum-banner-big-bottom.png" alt=""
                     className={"body-frame-banner body-frame-banner-border body-frame-banner-bottom"}/>
                <img src="/open-scrum-banner-big.png" alt=""
                     className={"body-frame-banner body-frame-banner-corner body-frame-banner-bottom-right-corner-0"}/>
                <img src="/open-scrum-banner-big.png" alt=""
                     className={"body-frame-banner body-frame-banner-corner body-frame-banner-bottom-right-corner-1"}/>
                <img src="/open-scrum-banner-big.png" alt=""
                     className={"body-frame-banner body-frame-banner-corner body-frame-banner-bottom-right-corner-2"}/>
                <div className={"container"}>
                    <div className="container-shadow-outset">
                        <div className="container-shadow-inset">
                            <RouterProvider router={router}/>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    </React.StrictMode>
);

reportWebVitals();
