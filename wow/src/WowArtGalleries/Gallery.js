import React, {createRef} from "react";
import "./Gallery.scss";
import Art from "./Gallery/Art";
import Hammer from "hammerjs";

export default class Gallery extends React.Component {
    sections = [];
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
        {'id': 10, 'image': '5'},
    ];

    constructor(props, context) {
        super(props, context);
        this.ref = createRef();
    }

    addSection = section => {
        this.sections.push(section);
    };

    componentDidMount() {
        this.props.sections(this.sections);
        this.props.registerSwipe(this.ref.current, 'sections', Hammer.DIRECTION_HORIZONTAL);
    }

    render() {
        return <div ref={this.ref} className="gallery">
            <img className="gallery-background" src={"assets/wow-art-galleries/gallery/background.png"} alt=""/>
            <img className="separator-start" src={"assets/wow-art-galleries/separator.png"} alt=""/>
            <img className="separator-finish" src={"assets/wow-art-galleries/separator.png"} alt=""/>
            {this.config.map(i => <div className={`gallery-section gallery-section-${i.id}`} ref={this.addSection}>
                <Art image={i.image}/>
            </div>)}
        </div>;
    }
}
