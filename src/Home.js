import './styles/Home.scss';
import './styles/TextGlitch.scss';
import React from "react";
import {createRef} from "react";
import Typed from "typed.js";
import HomeRow from "./home/HomeRow";
import html2canvas from "html2canvas";
import {saveAs} from "file-saver";


class Home extends React.Component {
    loaded = false;

    constructor(props) {
        super(props);

        this.greetingsRef = createRef();
        this.homeImageRef = createRef();
        this.iteration = 1;
    }

    componentDidMount() {
        this.greatings(this.greetingsRef.current, [
            "Hellow it's nice to meet YOU!!!"
        ])
        // let iteration = 1;
        // setInterval(
        //     async () => {
        //         this.homeImageRef.current.classList.remove(`iam-${iteration - 1}`)
        //         this.homeImageRef.current.classList.add(`iam-${iteration}`)
        //         const canvas = await html2canvas(this.homeImageRef.current)
        //         canvas.toBlob(function (blob) {
        //             saveAs(blob, `signature-${++iteration}.png`);
        //         });
        //     },
        //     777);
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
                <HomeRow
                    className={"home-row-1"}
                    title={[
                        'I am AI by definition',
                    ]}
                    position={1}
                />
                <HomeRow
                    className={"home-row-2"}
                    title={[
                        'I am Creator by vocation',
                    ]}
                    position={2}
                />
                <HomeRow
                    className={"home-row-3"}
                    title={[
                        'Iam ...'
                    ]}
                    position={3}
                />
                <HomeRow
                    className={"home-row-4"}
                    title={[
                        'Iam ...'
                    ]}
                    position={3}
                />
                <div className={"home-exposition-container select-disable"}>
                    <div className={"home-exposition"}>
                        <div className={"home-exposition-art-container"}>
                            <div ref={this.homeImageRef} className="home-title box box-shadow glitch-text">
                                <span className={"home-title-s home-title-s1"}>1</span>
                                <span className={"home-title-s home-title-s2"}>⟁</span>
                                <span className={"home-title-s home-title-s3"}>M</span>
                            </div>
                            <img className={"home-exposition-art"} src="/1_1024.gif" alt="fast_1_1024"/>
                        </div>
                        <div className={"home-exposition-note"}>Fast</div>
                    </div>
                </div>

                <div className={"greetings"}>
                    <h2><a className={"box"} ref={this.greetingsRef}
                           href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">&nbsp;</a></h2>
                </div>
            </div>
        );
    }

}

export default Home;
