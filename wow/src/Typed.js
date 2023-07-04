import React, {createRef} from "react";
import Typedjs from "typed.js";
import './styles/Typed.scss';

class Typed extends React.Component {

    constructor(props) {
        super(props);
        this.textRef = createRef();
        this.textSizeMeasureRef = createRef();
        this.state = {
            textMeasure: ''
        };
    }

    text = (el, text) => {
        return new Typedjs(el, {
            strings: text,
            typeSpeed: this.props.typeSpeed ?? 50,
            backSpeed: this.props.backSpeed ?? 15,
            cursorChar: this.props.cursorChar ?? '█',
        });
    }

    componentDidMount = () => {
        const title = this.props.title.map((single) => {
            if (!this.props.width) {
                return single;
            }
            this.textSizeMeasureRef.current.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
            const space = this.textSizeMeasureRef.current.offsetWidth / 50;
            this.textSizeMeasureRef.current.innerHTML = single.replace('<placeholder>', '');
            const withoutSpaces = this.textSizeMeasureRef.current.offsetWidth;
            const count = Math.ceil((this.props.width - withoutSpaces) / space);
            return single.replace('<placeholder>', '&nbsp;'.repeat(count));
        });

        this.text(this.textRef.current, title);
    }

    render() {
        return <span>
            <span className={this.props.className + " typed-text"} ref={this.textRef}></span>
            <span ref={this.textSizeMeasureRef} className={"typed-text-size-measure"}></span>
        </span>;
    }
}

export default Typed;
