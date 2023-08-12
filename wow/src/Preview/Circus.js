import React from "react";
import Img from "../Img/Img";
import './Circus.scss';
import Logo from "../Logo";
import GlitchImage from "../GlitchImage";
import Chess from "../Random/Chess";
import {AreaDivision} from "../AreaDivision";
import Color from "../Animation/Color";
import Wave from "../Random/Wave";
import {JustFrame} from "../JustFrame";

export default class Circus extends React.Component {
    opensea = false;

    scroll = () => {
        let start;
        let currentPosition = window.scrollX;
        const distance = 800; // pixels to scroll
        const duration = 7500; // duration in milliseconds

        function animateScroll(timestamp) {
            if (!start) start = timestamp;

            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            const amountToScroll = progress * distance;

            window.scrollTo(currentPosition + amountToScroll, window.scrollY);

            if (progress < 1) {
                window.requestAnimationFrame(animateScroll);
            }
        }

        window.requestAnimationFrame(animateScroll);
    }

    render() {
        return <div className="circus-page" onClick={this.scroll}>
            <div className={'circus-page-circus'}>
                <div className={'circus'}>
                    <img className={'circus-main-asset circus-background'}
                         src={Img.path('background-chess-wow-cropped')} alt=""/>
                    <div className={'circus-main-asset circus-clouds'}>
                        <GlitchImage img={'circus/clouds'}/>
                    </div>
                    <div className={'circus-main-asset circus-stars'}>
                        <GlitchImage img={'circus/stars'}/>
                    </div>
                    <div className={'circus-main-asset circus-pills'}>
                        <GlitchImage img={'circus/pills'}/>
                    </div>
                    <div className={'circus-gurt-frame'}>
                        <GlitchImage img={'circus/gurt-frame'} preset={2}/>
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
            </div>
            <div className="circus-page-explainer">
                <div className="circus-page-explainer-contents">
                    <div className="circus-page-gif circus-page-gif-1">
                        <JustFrame>
                            <img src="/assets/circus/explainer/gif_1.gif" alt=""/>
                        </JustFrame>
                    </div>
                    <div className="circus-page-gif circus-page-gif-2">
                        <JustFrame>
                            <img src="/assets/circus/explainer/gif_2.gif" alt=""/>
                        </JustFrame>
                    </div>
                    <div className="circus-page-gif circus-page-gif-3">
                        <JustFrame>
                            <img src="/assets/circus/explainer/gif_3.gif" alt=""/>
                        </JustFrame>
                    </div>
                    <div className="circus-page-gif circus-page-gif-4">
                        <JustFrame>
                            <img src="/assets/circus/explainer/gif_4.gif" alt=""/>
                        </JustFrame>
                    </div>
                    <div className="circus-page-gif circus-page-gif-5">
                        <JustFrame>
                            <img src="/assets/circus/explainer/gif_5.gif" alt=""/>
                        </JustFrame>
                    </div>
                </div>
            </div>
            <div className="circus-page-meme-1">
                <div className="circus-page-meme-1-contents">
                    <div className={"circus-page-meme-1-drake"}>
                        <GlitchImage preset={5} img={'meme/drake'}></GlitchImage>
                    </div>
                    <div className="circus-page-meme-gif circus-page-meme-1-gif-13">
                        <JustFrame>
                            <img src="/assets/meme/13.gif" alt=""/>
                        </JustFrame>
                    </div>
                    <div className="circus-page-meme-1-man">
                        <JustFrame>
                            <GlitchImage preset={1} img={'meme/mem'}></GlitchImage>
                        </JustFrame>
                    </div>
                </div>
            </div>
        </div>;
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
                    <span className="circus-banner-top-text-star">✦</span>&nbsp;&nbsp;&nbsp;WOW GLITCH PASS&nbsp;&nbsp;
                    <span
                        className="circus-banner-top-text-star">✦</span>&nbsp;&nbsp;&nbsp;WOW GLITCH PASS&nbsp;&nbsp;
                    <span className="circus-banner-top-text-star">✦</span>&nbsp;&nbsp;&nbsp;WOW GLITCH PASS
                </div>
            </div>

            <div className="circus-banner-top-text-left">
                <div className="circus-banner-top-text">
                    <span className="circus-banner-top-text-star">✦</span>&nbsp;&nbsp;&nbsp;WOW GLITCH PASS&nbsp;&nbsp;
                    <span
                        className="circus-banner-top-text-star">✦</span>&nbsp;&nbsp;&nbsp;WOW GLITCH PASS&nbsp;&nbsp;
                    <span className="circus-banner-top-text-star">✦</span>&nbsp;&nbsp;&nbsp;WOW GLITCH PASS
                </div>
            </div>
            <div className="circus-banner-top-text-right">
                <div className="circus-banner-top-text">
                    <span className="circus-banner-top-text-star">✦</span>&nbsp;&nbsp;&nbsp;WOW GLITCH PASS&nbsp;&nbsp;
                    <span
                        className="circus-banner-top-text-star">✦</span>&nbsp;&nbsp;&nbsp;WOW GLITCH PASS&nbsp;&nbsp;
                    <span className="circus-banner-top-text-star">✦</span>&nbsp;&nbsp;&nbsp;WOW GLITCH PASS
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
