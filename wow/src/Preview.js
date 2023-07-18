import './styles/Preview.scss';
import React, {useState} from "react";
import {useParams} from "react-router";
import {useContractRead} from 'wagmi';
import WowGurt from "./Mint/WowGurt.json";
import BrowserOrientation from "./BrowserOrientation";
import Button from "./Mint/Button";
import {JustFrame} from "./JustFrame";
import Scroller from "./Scroller";


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
                <JustFrame>
                    <div className={"preview-gif"}>
                        <img src={this.props.data.image} alt={this.props.data.seed}/>
                    </div>
                </JustFrame>
                <Scroller/>
                <img src="/unicorn.png" className={"unicorn"} alt="unicort"/>
            </div>
        );
    }
}

export default (props) => {
    const {id} = useParams()
    const [data, setData] = useState();
    useContractRead({
        address: process.env.REACT_APP_CONTRACT_ADDRESS,
        abi: WowGurt.abi,
        functionName: 'tokenURI',
        args: [Number(id)],
        async onSuccess(data) {
            setData(await (await fetch(data)).json());
        },
    });
    return <Preview
        {...props}
        id={id}
        data={data}
    />
};
