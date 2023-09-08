import React, {createRef} from "react";
import "./Gallery.scss";
import Art from "./Gallery/Art";

export default class Gallery extends React.Component {
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

    render() {
        return <div className="gallery">
            <img className="gallery-background" src={"assets/wow-art-galleries/gallery/background.png"} alt=""/>
            {this.config.map(i => <div className={`gallery-section gallery-section-${i.id}`} data-section-id={i.id}>
                <Art image={i.image}/>
            </div>)}
        </div>;
    }
}
