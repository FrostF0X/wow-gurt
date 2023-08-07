import React from "react";
import GlitchImage from "./GlitchImage";
import "./styles/WowLogo.scss";

export default class Logo extends React.Component {
    render() {
        return <div className={'wow-logo-container'}
                    style={{
                        "--wow-logo-size": `${this.props.size ? `${this.props.size}` : `100%`}`,
                    }}>
            <div className={'wow-logo'}>
                <div className="wow-logo-item wow-logo-frame"><GlitchImage preset={2} img={'logo/frame'}/></div>
                <div className="wow-logo-item wow-logo-lines"><GlitchImage preset={2} img={'logo/lines'}/></div>
                <div className="wow-logo-item wow-logo-w"><GlitchImage preset={7} img={'logo/w'}/></div>
                <div className="wow-logo-item wow-logo-geton"><GlitchImage img={'logo/geton'}/></div>
                <div className="wow-logo-item wow-logo-star"><GlitchImage preset={2} img={'logo/star'}/></div>
            </div>
        </div>
    }
}
