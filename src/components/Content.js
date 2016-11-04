import React from 'react';

export default class Content extends React.Component {
    render() {
        return (
            <div className="mailbox-content">{this.props.message ? this.props.message.message : 'Select the message'}</div>
        )
    }
}
