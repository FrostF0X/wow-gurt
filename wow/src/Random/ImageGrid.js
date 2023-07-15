import React, {createRef, Fragment} from "react";
import "../styles/JustGrid.scss";
import "./styles/ImageGrid.scss";
import ImageGridBig from "./ImageGridBig";
import ImageGridSmall from "./ImageGridSmall";
import './styles/Image.scss';

class ImageGrid extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.img = this.props.img;
        this.preset = this.props.preset;
        this.type = this.props.type;
        this.size = this.props.division.cols;
        this.item = createRef();
    }

    render() {
        return <Fragment>
            {this.type === 'big' ?
                <ImageGridBig images={1} preset={this.preset} img={this.img} size={this.size}/> :
                <ImageGridSmall preset={this.preset} img={this.img} division={this.props.division}/>}
        </Fragment>;
    }
}

export default ImageGrid;
