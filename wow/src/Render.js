import './styles/Render.scss';
import React from "react";
import Wow from "./Wow";
import Color from "./Animation/Color";

function query() {
    return new URLSearchParams(document.location.search);
}

class Render extends React.Component {
    constructor(props) {
        super(props);
        this.size = query().get('size') ?? 1024;
        this.config = JSON.parse(atob(query().get('config')));
        this.attributes = JSON.stringify(this.gatherAttributes(this.config));
    }

    render() {
        return (
            <div className={"just-render"}>
                <Wow slow={query().get('slow') ?? 10} size={this.size} config={this.config}/>
                <div id={"just-attributes"} data-json={this.attributes}></div>
            </div>
        );
    }

    gatherAttributes(c) {
        const animations = [];
        const assets = [];
        let chess = false;
        c.cells.forEach((c) => {
            assets.push(this.formatImg(c.config.img));
            switch (c.config.wowType) {
                case 'wave':
                    animations.push(this.formatAnimation('wave', c.config.img));
                    break;
                case 'images':
                    if (c.config.type === 'big') {
                        animations.push(this.formatAnimation('big', c.config.img));
                    } else {
                        animations.push(this.formatAnimation(c.config.preset, c.config.img));
                    }
                    break;
                case 'slider':
                    animations.push(this.formatAnimation('slider', c.config.img));
                    break;
                case 'chess':
                    animations.push(this.formatAnimation(c.config.preset, c.config.img));
                    chess = true;
                    break;
                default:
                    throw new Error('Cannot gather metadata from ' + c.config.type);
            }
        })
        return [
            ...animations.filter(this.onlyUnique).map((a) => ({
                trait_type: 'Animations',
                value: a
            })),
            ...assets.filter(this.onlyUnique).map(a => ({
                trait_type: 'Characters',
                value: a
            })),
            {
                trait_type: 'Chess',
                value: chess ? Color.reverseColorMap(c.colors[0]) + ' & ' + Color.reverseColorMap(c.colors[1]) : 'None'
            }
        ];
    }

    formatImg(img) {
        const imgs = {
            'unicorn': 'Smartycorn',
            'polihorseman': `Carousel Rider`,
            'stardroid': 'Starky Phone',
            'coolshoe': `Gurty Sneaker`,
            'gurtpin': 'Gurty',
            'sexydrugrabbit': 'Bunny Girl',
        }
        return imgs[img];
    }

    formatAnimation(name, img) {
        const names = {
            'wave': 'Snake',
            '1': 'Inversion Glitchy',
            '2': 'Smooth Glitchy',
            '3': 'Double Glitchy',
            '4': 'Quick Glitchy',
            '5': 'Disappearing',
            '6': 'Dynamic Pulsating',
            '7': 'Synchronous Pulsating',
            'slider': 'Sliding',
            'big': 'Gigantic'
        }
        return names[name] + ' ' + this.formatImg(img);
    }

    onlyUnique(value, index, array) {
        return array.indexOf(value) === index;
    }
}

export default Render;
