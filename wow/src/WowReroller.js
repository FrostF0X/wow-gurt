import AnimationConfig from "./AnimationConfig";
import Wave from "./Random/Wave";
import ImageGrid from "./Random/ImageGrid";
import Chess from "./Random/Chess";
import ImageSlider from "./Random/ImageSlider";
import React from "react";

export default class WowReroller extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.division = props.division
        this.state = {config: props.config};
    }

    reroll = () => {
        this.setConfig(AnimationConfig.wowConfig(this.division));
        document.getElementsByTagName('body')[0].classList.add('tutorial-hide');
    };

    setConfig = (c) => {
        this.props.configListener(c);
        this.setState({config: c})
    }

    justFromConfig(config) {
        if (config.wowType === 'wave') {
            return <Wave key={Number.random(0, Number.MAX_SAFE_INTEGER)}
                         img={config.img}
                         direction={config.direction}
                         preset={config.preset}
            />;
        }
        if (config.wowType === 'images') {
            return <ImageGrid key={Number.random(0, Number.MAX_SAFE_INTEGER)}
                              img={config.img}
                              preset={config.preset}
                              type={config.type}
                              division={this.division}
            />;
        }
        if (config.wowType === 'chess') {
            return <Chess key={Number.random(0, Number.MAX_SAFE_INTEGER)}
                          img={config.img}
                          preset={config.preset}
                          division={this.division}
            />;
        }
        if (config.wowType === 'slider') {
            return <ImageSlider key={Number.random(0, Number.MAX_SAFE_INTEGER)}
                                division={this.division}
                                config={config}
            />;
        }
    }

    render() {
        let style = {
            gridRow: `cell-${this.division.startRow} / cell-${this.division.endRow + 1}`,
            gridColumn: `cell-${this.division.startCol} / cell-${this.division.endCol + 1}`,
            cursor: 'pointer'
        };
        return <div className={"just-scene-grid-cell"} style={style}
                    onClick={this.reroll}>
            {this.justFromConfig(this.state.config)}
        </div>;
    }
}
