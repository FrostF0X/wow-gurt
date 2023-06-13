import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import './styles/Fonts.css';
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
            <filter id="filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox"
                    primitiveUnits="userSpaceOnUse" color-interpolation-filters="linearRGB">
                <feMorphology operator="dilate" radius="10 0" x="0%" y="0%" width="100%" height="100%"
                              in="SourceGraphic" result="morphology1"></feMorphology>
            </filter>
            <filter id="filter-2" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox"
                    primitiveUnits="userSpaceOnUse" color-interpolation-filters="linearRGB">
                <feMorphology operator="dilate" radius="10 2" x="0%" y="0%" width="100%" height="100%"
                              in="SourceGraphic" result="morphology1"></feMorphology>
            </filter>
            <filter id="filter-3" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox"
                    primitiveUnits="userSpaceOnUse" color-interpolation-filters="linearRGB">
                <feMorphology operator="dilate" radius="15 0" x="0%" y="0%" width="100%" height="100%"
                              in="SourceGraphic" result="morphology1"></feMorphology>
            </filter>
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
                    <div className="container-shadow">
                        <div className="container-border">
                            <RouterProvider router={router}/>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    </React.StrictMode>
);

reportWebVitals();
