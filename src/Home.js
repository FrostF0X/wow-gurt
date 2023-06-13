import './styles/Home.scss';
import React from "react";
import {createRef} from "react";

import Typed from "typed.js";
import HomeLink from "./home/HomeLink";

class Home extends React.Component {
    loaded = false;

    constructor(props) {
        super(props);
        this.greetingsRef = createRef();
    }

    componentDidMount() {
        this.greatings(this.greetingsRef.current, [
            "Hellow it's nice to meet YOU!!!"
        ])
    }

    greatings = (el, text) => {
        return new Typed(el, {
            strings: text,
            typeSpeed: 50,
            backSpeed: 15,
            cursorChar: '',
        });
    }


    render() {
        return (
            <div className={"home"}>
                <HomeLink
                    title={[
                        'Survey &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
                        'Business Agility &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                    ]}
                    explanation={['Discover you business agility weak and strong point, perfect for opening dialogue between your business and delivery team.']}
                    position={1}
                />
                <HomeLink
                    title={[
                        'Survey &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
                        'Business Agility &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                    ]}
                    explanation={['Discover you business agility weak and strong point, perfect for opening dialogue between your business and delivery team.']}
                    position={2}
                />
                <HomeLink
                    title={[
                        'Survey &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
                        'Business Agility &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                    ]}
                    explanation={['Discover you business agility weak and strong point, perfect for opening dialogue between your business and delivery team.']}
                    position={3}
                />
                <HomeLink
                    title={[
                        'Survey &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
                        'Business Agility &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                    ]}
                    explanation={['Discover you business agility weak and strong point, perfect for opening dialogue between your business and delivery team.']}
                    position={4}
                />
                <div className={"home-image-container select-disable"}>
                    <img className={"home-image"} src="/ccchaos.svg" alt="ccchaos"/>
                </div>
                <h1 className="home-title">OPEN SCRUM</h1>
                <div className={"greetings"}>
                    <h2><a ref={this.greetingsRef} href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">&nbsp;</a></h2>
                </div>
            </div>
        );
    }

}

export default Home;
