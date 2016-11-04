import React from 'react';
import dateformat from 'dateformat';
import '../index.css';

export default class Navigation extends React.Component {
    render() {
        let items = [],
            props = this.props;

        props.data && props.data.forEach((message, index) => {
            items.push(
                <div
                    key={index}
                    className={'item' + (props.selectedID === message.uid ? ' selected' : '')}
                    onClick={() => {
                        props.selectFunc(message.uid);
                    } }>
                    
                    <div className="read-status">
                        <div className={'status ' + (message.read ? 'read' : 'no-read')}></div>
                    </div>

                    <div className="content">
                        <div className="sender">{message.sender}</div>
                        <div className="subject">{message.subject}</div>
                        <div className="date">{dateformat(new Date(message.time_sent), 'ddd dd mmm, hh:MM')}</div>
                    </div>

                    <div className="delete"
                        onClick={() => {
                            props.deleteFunc(message.uid);
                        } }>
                        <img className="icon" src={require('../close-button.png')} />
                    </div>
                </div >
            );
        });

        return (
            <div className="mailbox-navigation">
                {items}
            </div>
        )
    }
}
