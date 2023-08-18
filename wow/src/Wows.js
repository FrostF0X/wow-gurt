import './styles/Wows.scss';
import React from "react";
import BrowserOrientation from "./BrowserOrientation";


export default class Wows extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orientation: BrowserOrientation.get(),
            data: []
        }
        BrowserOrientation.listen(o => this.setState((state) => ({...state, orientation: o})));
    }

    async componentDidMount() {
        this.setState({data: await (await fetch(`${process.env.REACT_APP_RENDERER_ADDRESS}/wows`)).json()});
    }

    render() {
        return <div className="wows-container">
            <div className="hint-overlay">

            </div>
            <div className={"wows"}>
                {this.state.data.map(wow => <a className={"wows-wow"} href={`/wow/${wow.tokenId}`}><img
                    loading={"lazy"}
                    src={wow.image512}
                    alt={""}/></a>)}
            </div>
        </div>;
    }
}
