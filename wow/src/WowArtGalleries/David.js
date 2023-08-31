import './David.scss';
import React from "react";
import GlitchImage from "../GlitchImage";
import Random from "../Random";

export default class David extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.face = [2, 3, 4, 5];
        this.pidstavka = [3, 2];
        this.state = {
            face: Random.fresh().randomItems(this.face, 3),
            pidstavka: Random.fresh().randomItems(this.pidstavka, 3),
            faceLine: Random.fresh().number(1, 3),
            pidstavkaLine: Random.fresh().number(1, 2),
        };
    }

    componentDidMount = () => {
        setInterval(() => {
            this.setState({
                face: Random.fresh().randomItems(this.face, 3),
                pidstavka: Random.fresh().randomItems(this.pidstavka, 3),
                faceLine: Random.fresh().number(1, 2),
                pidstavkaLine: Random.fresh().number(1, 2),
            })
        }, 33);
    };

    render() {
        console.log(this.state);
        return (
            <div className={`wow-art-galleries-david`}>
                <div className={`wow-art-galleries-david-item wow-art-galleries-david-back`}>
                    <GlitchImage img={`wow-art-galleries/david/back`} preset={'hue2'}/>
                </div>
                <div className={`wow-art-galleries-david-back-5`}>
                    <GlitchImage img={`wow-art-galleries/david/backs/David PFP-65`} preset={'hue'}/>
                </div>
                <div className={`wow-art-galleries-david-item wow-art-galleries-david-pidstavka-2`}>
                    <GlitchImage img={`wow-art-galleries/david/fills/pidstavka/${this.state.pidstavka[1]}`}
                                 preset={'hue'}/>
                </div>
                <div className={`wow-art-galleries-david-item wow-art-galleries-david-pidstavka-3`}>
                    <GlitchImage img={`wow-art-galleries/david/fills/pidstavka/${this.state.pidstavka[2]}`}
                                 preset={'hue'}/>
                </div>
                <div className={`wow-art-galleries-david-item wow-art-galleries-david-pidstavka-1`}>
                    <GlitchImage img={`wow-art-galleries/david/fills/pidstavka/${this.state.pidstavka[0]}`}
                                 preset={'hue'}/>
                </div>

                <div className={`wow-art-galleries-david-item wow-art-galleries-david-pidstavka-lines`}>
                    <GlitchImage img={`wow-art-galleries/david/lines/pidstavka-${this.state.pidstavkaLine}`}
                                 preset={'hue'}/>
                </div>
                <div className={`wow-art-galleries-david-item wow-art-galleries-david-face-2`}>
                    <GlitchImage img={`wow-art-galleries/david/fills/face/${this.state.face[1]}`} preset={'hue'}/>
                </div>
                <div className={`wow-art-galleries-david-item wow-art-galleries-david-face-3`}>
                    <GlitchImage img={`wow-art-galleries/david/fills/face/${this.state.face[2]}`} preset={'hue'}/>
                </div>
                <div className={`wow-art-galleries-david-item wow-art-galleries-david-face-1`}>
                    <GlitchImage img={`wow-art-galleries/david/fills/face/${this.state.face[0]}`} preset={'hue'}/>
                </div>
                <div className={`wow-art-galleries-david-item wow-art-galleries-david-face-lines`}>
                    <GlitchImage img={`wow-art-galleries/david/lines/face-${this.state.faceLine}`} preset={'hue'}/>
                </div>
                <div className={`wow-art-galleries-david-item wow-art-galleries-david-face-lines-2`}>
                    <GlitchImage img={`wow-art-galleries/david/lines/face-${this.state.faceLine}`} preset={'hue2'}/>
                </div>
                <div className={`wow-art-galleries-david-item wow-art-galleries-david-face-lines-3`}>
                    <GlitchImage img={`wow-art-galleries/david/lines/face-${this.state.faceLine}`} preset={'hue'}/>
                </div>
                <div className={`wow-art-galleries-david-item wow-art-galleries-david-face-shad1`}>
                    <GlitchImage img={`wow-art-galleries/david/lines/shad1`} preset={'hue2'}/>
                </div>
                <div className={`wow-art-galleries-david-item wow-art-galleries-david-face-shad2`}>
                    <GlitchImage img={`wow-art-galleries/david/lines/shad2`} preset={'hue'}/>
                </div>

                <div className={`wow-art-galleries-david-back-1`}>
                    <GlitchImage img={`wow-art-galleries/david/backs/David PFP-27`} preset={'5'}/>
                </div>
                <div className={`wow-art-galleries-david-back-2`}>
                    <GlitchImage img={`wow-art-galleries/david/backs/David PFP-28`} preset={'3'}/>
                </div>
                <div className={`wow-art-galleries-david-back-3`}>
                    <GlitchImage img={`wow-art-galleries/david/backs/David PFP-62`} preset={'7'}/>
                </div>
                <div className={`wow-art-galleries-david-back-4`}>
                    <GlitchImage img={`wow-art-galleries/david/backs/David PFP-53`} preset={'hue2'}/>
                </div>
                <div className={`wow-art-galleries-david-back-6`}>
                    <GlitchImage img={`wow-art-galleries/david/backs/David PFP-59`} preset={'7'}/>
                </div>
                <div className={`wow-art-galleries-david-back-7`}>
                    <GlitchImage img={`wow-art-galleries/david/backs/David PFP-58`} preset={'7'}/>
                </div>

                <div className={`wow-art-galleries-david-b wow-art-galleries-david-b1`}>
                    <div className={`wow-art-galleries-david-b-ds`}>
                        {this.davids()}
                    </div>
                </div>
                <div className={`wow-art-galleries-david-b wow-art-galleries-david-b2`}>
                    <div className={`wow-art-galleries-david-b-ds`}>
                        {this.davids()}
                    </div>
                </div>
            </div>
        );
    }

    davids() {
        return Array.range(1, 11).map(i => <div className={`wow-art-galleries-david-b-d`}>
            <GlitchImage img={`wow-art-galleries/david/lines/face-${this.state.faceLine}`}
                         preset={`${Random.fresh().randomItem(['hue', 'hue2', '2', '5', '7'])}`}/>
        </div>);
    }
}
