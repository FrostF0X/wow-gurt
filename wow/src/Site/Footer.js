import React from "react";

export class Footer extends React.Component {
    render() {
        return <footer>
            <div className="container">
                <div className="footer__row">
                    <div className="footer__left">
                        <div className="footer__logo"><img
                            src="https://gurt.agency/wp-content/themes/gurt/assets/img/gurt__logo__rozy.svg"
                            alt=""/></div>
                        <div className="footer__code"><img
                            src="https://gurt.agency/wp-content/themes/gurt/assets/img/code.svg" alt=""/>
                        </div>
                    </div>
                    <div className="footer__right">
                        <div className="footer__policy"><a href="https://gurt.agency/policy/">privacy policy</a></div>
                        <div className="footer__copy">©2022 gurt. All Rights Reserved.</div>
                    </div>
                </div>
            </div>

        </footer>
    }
}
