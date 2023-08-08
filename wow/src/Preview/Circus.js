import React from "react";
import Img from "../Img/Img";
import './Circus.scss';
import Logo from "../Logo";
import GlitchImage from "../GlitchImage";
import Chess from "../Random/Chess";
import {AreaDivision} from "../AreaDivision";
import Color from "../Animation/Color";
import Wave from "../Random/Wave";

export default class Circus extends React.Component {
    opensea = false;

    render() {
        return <>
            <div className={'circus-background-top'}>
                <img className={'circus-main-asset circus-background'} src={Img.path('circus/background')} alt=""/>
                <div className={'circus-main-asset circus-background-shadow'}>
                    <GlitchImage img={'circus/background'} preset={2}/>
                </div>
            </div>
            <div className={'circus'}>
                <img className={'circus-main-asset circus-background'} src={Img.path('circus/background')} alt=""/>

                <div className={'circus-main-asset circus-background-shadow'}>
                    <GlitchImage img={'circus/background'} preset={2}/>
                </div>
                <img className={'circus-main-asset circus-scene'} src={Img.path('circus/scene')} alt=""/>
                <div className="circus-asset left-polihorseman">
                    <GlitchImage img={'polihorseman'} preset={2}/>
                </div>
                <div className="circus-asset right-polihorseman">
                    <GlitchImage img={'polihorseman'} preset={5}/>
                </div>
                <div className="circus-logo">
                    <Logo/>
                </div>
                <div className="circus-main-asset circus-tent">
                    <GlitchImage img={'circus/tent'} preset={2}/>
                </div>
                {this.tentTop()}
                {this.banner()}
                {this.left()}
                {this.right()}
                {this.bannerBottom()}
                <div className="circus-sphere">
                    <GlitchImage img={'circus/sphere'} preset={5}/>
                </div>
                {this.opensea ?
                    <div className="opensea-left">
                        <GlitchImage img={'circus/opensea-left'}/>
                    </div> : null}
                {this.opensea ?
                    <div className="opensea-top">
                        <GlitchImage img={'circus/opensea-top'}/>
                    </div> : null}
                {this.opensea ? <div className="opensea-overlay"></div> : null}

                <img className={'circus-main-asset circus-all'} src={Img.path('circus/all')} alt=""/>
            </div>
            <div className={'circus-background-bottom'}>
                <img className={'circus-main-asset circus-background'} src={Img.path('circus/background')} alt=""/>
                <div className={'circus-main-asset circus-background-shadow'}>
                    <GlitchImage img={'circus/background'} preset={2}/>
                </div>
            </div>
        </>;
    }

    right() {
        return <>
            <div className="circus-frame-right-close">
                <GlitchImage img={'circus/frame-chess-right'}/>
            </div>
            <div className="circus-frame-right-close-chess" style={{
                '--scene-size': '100px',
                '--image-size': '50px',
                '--chess-color-1': Color.colors.orange,
                '--chess-color-2': Color.colors.pink,
            }}>
                <Chess key={Number.random(0, Number.MAX_SAFE_INTEGER)}
                       img={'coolshoe'}
                       preset={3}
                       division={new AreaDivision(1, 4, 1, 4, [])}
                />
            </div>
            <div className="circus-frame-portal-right-close">
                <GlitchImage img={'circus/frame-portal-right'} preset={2}/>
            </div>
            <div className="circus-frame-portal-rabbit-right-close-shadow">
                <GlitchImage img={'circus/rabbit-right'} preset={3}/>
            </div>
            <div className="circus-frame-portal-rabbit-right-close">
                <GlitchImage img={'circus/rabbit-right'} preset={2}/>
            </div>
            <div className="circus-frame-right-1">
                <GlitchImage img={'circus/frame-chess-right'} preset={5}/>
            </div>
            <div className="circus-frame-bottom-right">
                <GlitchImage img={'circus/frame-bottom-right'} preset={2}/>
            </div>
            <div className="circus-frame-bottom-right-snake" style={{
                '--wow-scene-size': '200px',
                '--image-size': '50px',
                '--chess-color-1': Color.colors.pink,
                '--chess-color-2': Color.colors.orange,
            }}>
                <Wave key={Number.random(0, Number.MAX_SAFE_INTEGER)}
                      img={'polihorseman'}
                      direction={'horizontal'}
                      preset={'2'}
                />
            </div>
        </>;
    }

    left() {
        return <>
            <div className="circus-frame-left-close">
                <GlitchImage img={'circus/frame-chess-left'}/>
            </div>
            <div className="circus-frame-left-close-chess" style={{
                '--scene-size': '100px',
                '--image-size': '50px',
                '--chess-color-1': Color.colors.green,
                '--chess-color-2': Color.colors.blue,
            }}>
                <Chess key={Number.random(0, Number.MAX_SAFE_INTEGER)}
                       img={'unicorn'}
                       preset={5}
                       division={new AreaDivision(1, 4, 1, 4, [])}
                />
            </div>
            <div className="circus-frame-portal-left">
                <GlitchImage img={'circus/frame-portal-left'} preset={2}/>
            </div>
            <div className="circus-frame-portal-legs-left">
                <GlitchImage img={'circus/legs-left'} preset={4}/>
            </div>
            <div className="circus-frame-bottom-left">
                <GlitchImage img={'circus/frame-bottom-left'} preset={2}/>
            </div>
            <div className="circus-frame-bottom-left-snake" style={{
                '--wow-scene-size': '200px',
                '--image-size': '50px',
                '--chess-color-1': Color.colors.green,
                '--chess-color-2': Color.colors.blue,
            }}>
                <Wave key={Number.random(0, Number.MAX_SAFE_INTEGER)}
                      img={'stardroid'}
                      direction={'horizontal'}
                      preset={'2'}
                />
            </div>
        </>;
    }

    tentTop() {
        return <>
            <div className="circus-asset circus-alina">
                <GlitchImage img={'circus/alina'}/>
            </div>
            <div className="circus-asset circus-dima">
                <GlitchImage img={'circus/dima'}/>
            </div>
            <div className="circus-rabbits-left-1">
                <GlitchImage img={'circus/rabbits-left'} preset={2}/>
            </div>
            <div className="circus-rabbits-left">
                <GlitchImage img={'circus/rabbits-left'}/>
            </div>
            <div className="circus-rabbits-right-1">
                <GlitchImage img={'circus/rabbits-right'} preset={2}/>
            </div>
            <div className="circus-rabbits-right">
                <GlitchImage img={'circus/rabbits-right'}/>
            </div>
        </>;
    }

    banner() {
        return <>
            <div className="circus-banner-top-shadow">
                <GlitchImage img={'circus/banner-top'} preset={1}/>
            </div>
            <div className="circus-banner-top">
                <GlitchImage img={'circus/banner-top'}/>
            </div>
            <div className="circus-banner-top-text-center">
                <div className="circus-banner-top-text">
                    <span className="circus-banner-top-text-star">✦</span>&nbsp;&nbsp;&nbsp;GLITCH
                    WOW&nbsp;&nbsp;<span
                    className="circus-banner-top-text-star">✦</span>&nbsp;&nbsp;&nbsp;GLITCH WOW&nbsp;&nbsp;
                    <span className="circus-banner-top-text-star">✦</span>&nbsp;&nbsp;&nbsp;GLITCH WOW
                </div>
            </div>

            <div className="circus-banner-top-text-left">
                <div className="circus-banner-top-text">
                    <span className="circus-banner-top-text-star">✦</span>&nbsp;&nbsp;&nbsp;GLITCH
                    WOW&nbsp;&nbsp;<span
                    className="circus-banner-top-text-star">✦</span>&nbsp;&nbsp;&nbsp;GLITCH WOW&nbsp;&nbsp;
                    <span className="circus-banner-top-text-star">✦</span>&nbsp;&nbsp;&nbsp;GLITCH WOW
                </div>
            </div>
            <div className="circus-banner-top-text-right">
                <div className="circus-banner-top-text">
                    <span className="circus-banner-top-text-star">✦</span>&nbsp;&nbsp;&nbsp;GLITCH
                    WOW&nbsp;&nbsp;<span
                    className="circus-banner-top-text-star">✦</span>&nbsp;&nbsp;&nbsp;GLITCH WOW&nbsp;&nbsp;
                    <span className="circus-banner-top-text-star">✦</span>&nbsp;&nbsp;&nbsp;GLITCH WOW
                </div>
            </div>
        </>;
    }

    bannerBottom() {
        return <>
            <div className="circus-banner-bottom-shadow">
                <GlitchImage img={'circus/banner-bottom'} preset={2}/>
            </div>
            <div className="circus-banner-bottom">
                <GlitchImage img={'circus/banner-bottom'} preset={2}/>
            </div>
            <div className="circus-banner-bottom-text-center">
                <div className="circus-banner-bottom-text">
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;TRY YOUR LUCK&nbsp;&nbsp;
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;TRY YOUR LUCK&nbsp;&nbsp;
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                </div>
            </div>

            <div className="circus-banner-bottom-text-left">
                <div className="circus-banner-bottom-text">
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
            </div>
            <div className="circus-banner-bottom-text-right">
                <div className="circus-banner-bottom-text">
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="circus-banner-bottom-text-star">✦</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
            </div>
        </>;
    }

}
