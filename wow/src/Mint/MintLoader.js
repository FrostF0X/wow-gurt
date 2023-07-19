import React from "react";

export default class MintLoader extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.size = 6;
        this.window = 5;
        this.loaderPos = 0;
        this.state = {
            enabled: Array.range(1, this.window - 1).map(() => false),
            timer: 90
        };
    }

    str_pad_left(string, pad, length) {
        return (new Array(length + 1).join(pad) + string).slice(-length);
    }

    componentDidMount() {
        setInterval(() => {
            this.loaderPos++;
            if (this.loaderPos >= this.size) {
                this.loaderPos = 0;
            }
            this.setState(state => ({
                ...state,
                enabled: state.enabled.map((i, key) => (this.loaderPos + 1) % this.window === key || this.loaderPos % this.window === key),
            }));
        }, 325);
        setInterval(() => this.setState((prev) => ({...prev, timer: this.state.timer - 1})), 1000);
    }

    render() {
        const minutes = Math.floor(this.state.timer / 60);
        const seconds = this.state.timer - minutes * 60;

        return (
            <div className={"generate-btn-loading"}>
                {this.state.enabled.map((i, key) => <img
                    key={key}
                    className={`loader loader-inverted ${i ? 'loader-empty' : ''}`}
                    src={"/loader.svg"}
                    alt={"loader"}/>
                )}
                <div className={"timer"}>{this.str_pad_left(minutes, '0', 2) + ':' + this.str_pad_left(seconds, '0', 2)}</div>
            </div>
        );
    }
}
