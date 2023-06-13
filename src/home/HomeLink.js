import React, {createRef} from "react";
import Typed from "typed.js";
import '../styles/HomeLink.scss';

class HomeLink extends React.Component {

    constructor(props) {
        super(props);
        this.linkHeaderRef = createRef();
        this.linkExplanationRef = createRef();
    }

    showExplanation = () => {
        if (!this.linkExplanation) {
            this.linkExplanation = this.explanation(this.linkExplanationRef.current, this.props.explanation);
        } else {
            this.linkExplanation.toggle();
        }
    }

    hideExplanation = () => {
        this.linkExplanation.destroy();
        this.linkExplanation = null;
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
            typeSpeed: 5,
            backSpeed: 5,
            cursorChar: '▌',
        });
    }

    componentDidMount = () => {
        this.header(this.linkHeaderRef.current, this.props.title);
    }


    render() {
        return <div className={`home-link home-link-${this.props.position}`} onMouseEnter={this.showExplanation}
                    onMouseLeave={this.hideExplanation}>
            <a href="/survey">
                <div className={"home-link-header"}>
                    <h3 ref={this.linkHeaderRef} className={"home-link-header-text"}>&nbsp;fi</h3>
                </div>
                <div className={"home-link-explanation"}>
                        <span ref={this.linkExplanationRef}
                              className={"home-link-explanation-text"}>
                        </span>
                </div>
            </a>
        </div>
    }
}

export default HomeLink;
