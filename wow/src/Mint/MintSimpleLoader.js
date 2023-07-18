import React from "react";

export default class MintSimpleLoader extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            timer: 120
        };
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({timer: this.state.timer - 1});
        }, 1000);
    }

    render() {
        return (
            <div className={"generate-btn-loading"}>
                <div className={"timer"}>Generating! {this.state.timer}</div>
            </div>
        );
    }
}
