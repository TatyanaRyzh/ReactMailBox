import React from 'react';
import Navigation from '../components/Navigation'
import Content from '../components/Content'


let MailBox = React.createClass({
    componentDidMount: function () {
        let that = this;

        new Promise(resolve => {
            let xmlhttp = new XMLHttpRequest();
            xmlhttp.open('GET', 'messages_sample.json', true);
            xmlhttp.setRequestHeader('Content-Type', 'application/json')
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4 && (xmlhttp.status == 200 || xmlhttp.status == 304)) {
                    resolve(JSON.parse(xmlhttp.responseText));
                }
            };
            xmlhttp.send();
        }).then((returnedData) => {
            that.setState({ messages: returnedData.messages });
        });
    },

    getInitialState: function () {
        return {
            messages: [],
            selectedID: undefined
        }
    },

    getMessageByID: function (id) {
        return this.state.messages.find(msg => {
            return msg.uid === id;
        });
    },

    deleteMessage: function (id) {
        let index = this.state.messages.findIndex(msg => {
            return msg.uid === id;
        });
        this.state.messages.splice(index, 1);
        this.setState({ messages: this.state.messages });
    },

    selectMessage: function (id) {
        this.addReadStatus(id);
        this.setState({ selectedID: id });
    },

    addReadStatus: function (id) {
        this.getMessageByID(id).read = true;
    },

    render: function () {
        let state = this.state;
        return (

            <div className="mailbox">
                <div className="mailbox-header">
                    <div>TEST MAILBOX COMPONENT</div>
                </div>
                <Navigation
                    data={state.messages}
                    selectedID={state.selectedID}

                    selectFunc={this.selectMessage}
                    deleteFunc={this.deleteMessage}
                    />
                <Content
                    message={this.getMessageByID(state.selectedID)}
                    />
            </div>
        )
    }
});

export default MailBox;
