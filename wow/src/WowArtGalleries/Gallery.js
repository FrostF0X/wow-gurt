import React, {createRef} from "react";
import "./Gallery.scss";
import Art from "./Gallery/Art";
import {ScreenContext} from "./ScreenC";
import Random from "../Random";

export default class Gallery extends React.Component {
    static contextType = ScreenContext;
    config = [
        {'id': 1, 'image': '1'},
        {'id': 2, 'image': '2'},
        {'id': 3, 'image': '3'},
        {'id': 4, 'image': '4'},
        {'id': 5, 'image': '5'},
        {'id': 6, 'image': '1'},
        {'id': 7, 'image': '2'},
        {'id': 8, 'image': '3'},
        {'id': 9, 'image': '4'},
    ];


    constructor(props, context) {
        super(props, context);
        this.ref = createRef();
        this.state = {
            'objects': this.genWallObjects()
        };
    }
    componentDidMount = () => {
        // setInterval(() => {
        //     this.setState({'objects': this.genWallObjects()});
        // }, 1000);
    };

    genWallObjects() {
        let object1 = Random.fresh().randomItems(Array.range(30, 50), 2);
        return Array.range(1, 2000).map(_ => ({
            'rotate': Number.random(1, 360),
            'skew': Number.random(1, 10),
            'object': Random.fresh().randomItem(object1),
        }));
    }

    render() {
        return <div className="gallery" ref={this.ref}>
            <img className="gallery-background gallery-background-1"
                 src={"assets/wow-art-galleries/gallery/background.png"} alt=""/>
            <img className="gallery-background gallery-background-2"
                 src={"assets/wow-art-galleries/gallery/background.png"} alt=""/>
            <img className="gallery-background gallery-background-3"
                 src={"assets/wow-art-galleries/gallery/background.png"} alt=""/>
            <div className="gallery-objects">{this.state.objects.map(this.object)}</div>
            <div className={'gallery-section gallery-section-start'} data-section-id={'start'}></div>
            {this.config.map(i => <div className={`gallery-section gallery-section-${i.id}`} data-section-id={i.id}>
                <Art image={i.image}/>
            </div>)}
            <div className={'gallery-section gallery-section-finish'} data-section-id={'finish'}></div>
        </div>;
    }

    object(o) {
        return <div className={`gallery-object`}>
            <img className="" style={{transform: `rotate(${o.rotate}deg) skew(${o.skew}deg, ${o.skew}deg) translate(-50%, -50%)`}}
                 src={`assets/wow-art-galleries/gallery/objects/${o.object}.png`} alt=""/>
        </div>;
    }
}
