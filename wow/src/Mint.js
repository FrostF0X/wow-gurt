import './styles/Mint.scss';
import React from "react";
import Web3 from 'web3';
import Just from "./Just";
import Random from "./Random";
import WowGurt from "./WowGurt.json";

function query() {
    return new URLSearchParams(document.location.search);
}

class Mint extends React.Component {
    loaded = false;
    constructor(props) {
        super(props);
        this.state = {
            btnText: "▲ Mint ▲",
        };
        this.account = null;
        this.contract = null;
        this.seed = query().get('seed') ?? String(Number.random(0, 10000));
        Random.init(this.seed);
        this.web3 = new Web3(window.ethereum);
        this.mint = this.mint.bind(this);
    }

    async componentDidMount() {
        if (this.loaded) {
            return false;
        }
        this.loaded = true;
        await window.ethereum.enable();
        const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
        this.account = (await this.web3.eth.getAccounts())[0];
        this.contract = new this.web3.eth.Contract(WowGurt.abi, contractAddress);
    }

    async mint() {
        this.startLoader();

        const response = await fetch(process.env.REACT_APP_RENDERER_ADDRESS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                seed: this.seed
            })
        });

        const data = await response.json();

        this.stopLoader();
        const tx = await this.contract.methods.mintNFT(this.account, data.url).send({from: this.account});
        console.log(tx);
    }

    startLoader() {
        this.loaderInterval = setInterval(() => {
            if (this.state.btnText.length >= 5) {
                this.setState((prevState) => ({...prevState, btnText: "▲"}));
            } else {
                this.setState((prevState) => ({...prevState, btnText: prevState.btnText + "▲"}));
            }
        }, 500);
    }

    stopLoader() {
        clearInterval(this.loaderInterval);
        Random.init(this.seed);
        this.setState({btnText: "▲ Mint ▲"});
    }

    render() {
        return (
            <div className={"mint"}>
                <div className="just-preview"><Just/></div>
                <button className="mint-btn" onClick={this.mint}>{this.state.btnText}</button>
            </div>
        );
    }
}

export default Mint;
