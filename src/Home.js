import './styles/Home.css';
import React from "react";
import Typed from "typed.js";

class Home extends React.Component {
    loaded = false;

    componentDidMount() {
        if(this.loaded) {
            return;
        }
        new Typed('.home-link>a', {
            strings: [
                'Survey&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
                'Business Agility&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
            ],
            typeSpeed: 50,
            cursorChar: '█'
        });
        this.loaded = true;
    }

    render() {
        return (
            <div className={"home"}>
                <div className="home-link">
                    <a href="/survey">&nbsp;</a>
                </div>
                <div className={"home-image-container"}>
                    <img className={"home-image"} src="/ccchaos.svg" alt="ccchaos"/>
                </div>
            </div>
        );
    }

}

export default Home;
