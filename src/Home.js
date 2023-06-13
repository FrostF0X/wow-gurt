import './styles/Home.css';
import React from "react";
import {createRef} from "react";

import Typed from "typed.js";

class Home extends React.Component {
    loaded = false;

    constructor(props) {
        super(props);
        this.link1HeaderRef = createRef();
        this.link1ExplanationRef = createRef();
    }

    header = (el, text) => {
        return new Typed(el, {
            strings: text,
            typeSpeed: 50,
            backSpeed: 15,
            cursorChar: '█',
        });
    }

    explanation = (el, text) => {
        return new Typed(el, {
            strings: text,
            typeSpeed: 3,
            backSpeed: 3,
            cursorChar: '',
        });
    }


    componentDidMount = () => {
        if (this.loaded) {
            return;
        }
        this.loaded = true;


        this.header(this.link1HeaderRef.current, [
            'Survey &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
            'Business Agility &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
        ]);
    }

    showExplanation = () => {
        if (!this.link1Explanation) {
            this.link1Explanation = this.explanation(this.link1ExplanationRef.current, [
                `Discover you business agility weak and strong point, perfect for opening dialogue between your business and delivery team`
            ]);
        } else {
            this.link1Explanation.toggle();
        }

    }

    hideExplanation = () => {
        this.link1Explanation.destroy();
        this.link1Explanation = null;
    }


    render() {
        return (
            <div className={"home"}>
                <div className="home-link" onMouseEnter={this.showExplanation} onMouseLeave={this.hideExplanation}>
                    <div className={"home-link-header"}>
                        <div className={"home-link-header-text"}><a ref={this.link1HeaderRef} href="/survey">&nbsp;</a>
                        </div>
                    </div>
                    <div className={"home-link-explanation"}>
                        <span ref={this.link1ExplanationRef}
                              className={"home-link-explanation-text"}>
                        </span>
                    </div>
                </div>
                <div className={"home-image-container select-disable"}>
                    <img className={"home-image"} src="/ccchaos.svg" alt="ccchaos"/>
                </div>
            </div>
        );
    }

}

export default Home;
