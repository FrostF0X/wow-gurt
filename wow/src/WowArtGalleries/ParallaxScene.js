import React, {useRef} from "react";
import {useParallax} from "react-scroll-parallax";
import "./ParallaxScene.scss";

export default function ParallaxScene({children}) {
    const target = useRef(null);

    const mid = useParallax({
        translateX: [0, 100],
        targetElement: target.current,
    });

    return <div className={'parallax-scene'} style={{width: "2115dvh"}} ref={target}>
        <div ref={mid.ref} className={'parallax-layer'} style={{
            right: 0,
        }}>
            {children}
        </div>
    </div>;
}
