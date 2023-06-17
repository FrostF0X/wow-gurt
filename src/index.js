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
import Frame from "./Frame";


String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for (var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

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
    <div className="App">
        <header className="App-header">
            <Frame className={"frame-banner-border frame-banner-top"}/>
            <Frame className={"frame-banner-border frame-banner-left"}/>
            <Frame className={"frame-banner-border frame-banner-right"}/>
            <Frame className={"frame-banner-border frame-banner-bottom"}/>
            <div className={"container"}>
                <RouterProvider router={router}/>
            </div>
        </header>
    </div>
);

reportWebVitals();
