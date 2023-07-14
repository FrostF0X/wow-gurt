import React from 'react';
import {JustFrame} from "./JustFrame";
import Just from "./Just";

export default class WowScroller extends React.Component {
    render() {
        return <div className="just-preview"><JustFrame plain={true}><Just size={this.props.size}
                                                                           random={this.props.random}/></JustFrame>
        </div>;
    }
}
