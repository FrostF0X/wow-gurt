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
                <div className="preview-content">
                    <div className={"preview-description"}>
                        <Button><a className={'btn'} href="/">Mint more!</a></Button>
                    </div>
                    <div className="preview-wow">
                        <JustFrame>
                            <div className={"preview-gif"}>
                                <img src={this.props.data.image} alt={this.props.data.seed}/>
                            </div>
                        </JustFrame>
                    </div>
                    <div className={"preview-actions"}>
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

export default RealPreview;
