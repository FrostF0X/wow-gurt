import './styles/Preview.scss';
import React, {useState} from "react";
import {useParams} from "react-router";
import {useContractRead} from 'wagmi';
import WowGurt from "./Mint/WowGurt.json";
import BrowserOrientation from "./BrowserOrientation";
import Button from "./Mint/Button";
import Scroller from "./Scroller";
import WowScroller from "./WowScroller";
import {JustFrame} from "./JustFrame";


class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orientation: BrowserOrientation.get()
        }
        BrowserOrientation.listen(o => this.setState((state) => ({...state, orientation: o})));
    }

    render() {

        if (!this.props.data) {
            return <div className={`preview preview-${this.state.orientation}`}>
                <Button>Loading data</Button>
            </div>
        }
        return (
            <div className={`preview preview-${this.state.orientation}`}>
                <div className="preview-content">
                    <div className={"preview-description"}>
                        <a href="https://gurt.agency" target={"_blank"} rel="noreferrer">
                            <JustFrame>
                                <div className="gurt">
                                    <img src="/gurt.svg" alt="gurt"/>
                                </div>
                            </JustFrame>
                        </a>
                        <Button>
                            <a href="/">
                                <button className={"btn"}>More WOWs!</button>
                            </a>
                        </Button>
                    </div>
                    <div className="preview-wow">
                        <WowScroller config={JSON.parse(atob(this.props.data.config))}></WowScroller>
                    </div>
                    <div className={"preview-actions"}>
                        <div style={{margin: "2em 1em 0 1em"}}>
                            <table className={"padded"}>
                                <thead>
                                <tr>
                                    <th><h1>{this.props.data.name}</h1></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{this.props.data.description}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <a className={"opensea"} target={"_blank"} rel="noreferrer"
                           href={`${process.env.REACT_APP_OPENSEA_ITEM_LINK}${process.env.REACT_APP_CONTRACT_ADDRESS}/${this.props.id}`}><img
                            src={"/opensea.svg"}
                            alt={"opensea"}/></a>
                    </div>
                </div>
                <div className={"preview-scroller"}><Scroller/></div>
                <img src="/unicorn.png" className={"unicorn"} alt="unicort"/>
                <img src="/polihorseman.png" className={"polihorseman"} alt="unicort"/>
            </div>

        );
    }
}

const RealPreview = (props) => {
    const {id} = useParams()
    const [data, setData] = useState();
    useContractRead({
        address: process.env.REACT_APP_CONTRACT_ADDRESS,
        abi: WowGurt.abi,
        functionName: 'tokenURI',
        retry: true,
        args: [Number(id)],
        async onSuccess(data) {
            setData(await (await fetch(data)).json());
        },
        async onError() {
            setTimeout(() => window.location.reload(), 5000);
        }
    });
    return <Preview
        {...props}
        id={id}
        data={data}
    />
};

export default RealPreview;
