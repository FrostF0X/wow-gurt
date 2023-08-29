import ReactGA4 from "react-ga4";
import React from "react";

const initGA = (id) => {
    console.log(`GA: ${id}`);
    if (process.env.GA !== 'true') {
        return;
    }
    ReactGA4.initialize(`${id}`);
    ReactGA4.send({hitType: "pageview", page: window.location.href, title: window.location.href});
};

const track = (
    category,
    action,
    label
) => {
    console.log("GA event:", category, ":", action, ":", label);
    if (process.env.GA !== 'true') {
        return;
    }
    ReactGA4.event({
        category: category,
        action: action,
        label: label,
    });
};

export default class GA extends React.Component {
    componentDidMount() {
        initGA(this.props.id);
    }

    render() {
        return <></>;
    }
}

export {initGA, track};
