import React, {createRef, Fragment} from "react";
import "../styles/JustGrid.scss";
import "./styles/ImageGrid.scss";
import ImageGridBig from "./ImageGridBig";
import ImageGridSmall from "./ImageGridSmall";
import './styles/Image.scss';

class ImageGrid extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.img = this.props.random.img().rand();
        this.item = createRef();
        this.preset = this.props.random.img().randp();
        this.cols = this.props.division.endCol - this.props.division.startCol + 1;
        this.rows = this.props.division.endRow - this.props.division.startRow + 1;
        console.log(this.cols % this.rows === 0 || this.cols % this.rows === 0);
        if ((this.cols === this.rows) && (this.cols !== 1)) {
            this.type = 'big';
            this.size = Math.min(this.cols, this.rows);
            this.images = this.cols % this.rows === 0 ? this.cols / this.rows : this.rows / this.cols;
        }
    }

    render() {
        return <Fragment>
            {this.type === 'big' ?
                <ImageGridBig preset={this.preset} img={this.img} images={this.images} size={this.size}/> :
                <ImageGridSmall preset={this.preset} img={this.img} division={this.props.division}/>}
        </Fragment>;
    }
}

export default ImageGrid;
