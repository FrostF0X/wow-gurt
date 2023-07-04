import React, {Fragment} from 'react';
import ReactDOM from 'react-dom/client';
import './Common/Primitives'
import './styles/index.scss';
import './styles/Fonts.css';
import reportWebVitals from './reportWebVitals';
import Just from "./Just";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Fragment>
        <Just></Just>
    </Fragment>
);

reportWebVitals();
