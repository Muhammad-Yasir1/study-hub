import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import CAAction from "../../store/actions/CAAction";
import * as firebase from "firebase";
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

const style = {
    margin: 12,
};

const msg = {
    // textAlign : 'left',
    border: '2px solid lightgreen',
    backgroundColor: 'lightgreen',
    margin: '5px 20px',
    borderRadius: 10,
    padding: 5,

}
//   const userId = firebase.auth().currentUser.uid;
class ChatBox extends Component {
    constructor() {
        super();
        this.state = {
            msg: '',
            userChat: null,
            img: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps.userChat);
        this.setState({ userChat: nextProps.userChat });
        // <Card>
        // <CardTitle title="" subtitle="SignUp Here !" />
        //             </Card>
    }
    render() {
        return (
            this.state.userChat ? <div>
                <div style={{ overflow: 'auto', height: 400, maxHeight: 400, width: '100%', border: '2px solid brown' }}>
                    {/* To Chat This Person */}
                    <Card>
                        <CardTitle style={{ fontSize: 22, padding: 10 }} title={this.state.userChat !== undefined ? this.props.allUsers[this.state.userChat] !== undefined ? this.props.allUsers[this.state.userChat].name : null : null}
                            subtitle="Lets Chat !"
                        >
                            <hr /></CardTitle>
                    </Card>
                    {/* To Chat This Person Adove */}
                    {this.state.userChat !== null ? this.props.chatData !== undefined ?
                        Object.keys(this.props.chatData).map((chatKey, i) => {
                            let oneMsg = this.props.chatData[chatKey];
                            if (oneMsg.sender === firebase.auth().currentUser.uid) {
                                if (oneMsg.receiver === this.state.userChat) {
                                    if (oneMsg.type === 'IMG') {
                                        return <div key={chatKey} style={oneMsg.sender === firebase.auth().currentUser.uid ? { textAlign: 'right' } : { textAlign: 'left' }}>
                                            <img src={oneMsg.img} alt='Sended Photo' style={{ maxHeight: 350, maxWidth: 300 }} />
                                        </div>
                                    } else {
                                        return (<p key={chatKey}
                                            style={oneMsg.sender === firebase.auth().currentUser.uid ? { textAlign: 'right' } : { textAlign: 'left' }}> <span style={msg}>{oneMsg.msg}</span> </p>);
                                    }
                                }
                            }
                        })

                        : null : null}


                </div>

                <div >
                    <TextField
                        value={this.state.msg}
                        onChange={(e) => { this.setState({ msg: e.target.value }) }}
                        floatingLabelText="Type Your Message"
                    />
                    <RaisedButton label="send" secondary={true} style={style}
                        onClick={() => {
                            let time = new Date();
                            let msg = {
                                type: 'TEXT',
                                msg: this.state.msg,
                                time: time,
                                sender: firebase.auth().currentUser.uid,
                                receiver: this.state.userChat
                            }
                            // console.log(msg);
                            this.props.addMsg(msg);
                        }}
                    />
                    <TextField
                        type='file'
                        onChange={(e) => { this.setState({ img: e.target.files[0] }) }}
                    />

                    <RaisedButton type='file' label="Upload Image" secondary={true} style={style}
                        onClick={() => {
                            // firebase.storage().ref(`pictures/${this.state.img.name}`).put(this.state.img).then((res) => {
                            //     let time = new Date();
                            //     let msg = {
                            //         type: 'IMG',
                            //         img: res.downloadURL,
                            //         time: time,
                            //         sender: firebase.auth().currentUser.uid,
                            //         receiver: this.state.userChat
                            //     }
                            //     // console.log(msg);
                            //     this.props.addImg(this.state.img);
                            //     console.log(res.downloadURL);
                            // });
                            this.props.addImg({ file: this.state.img, receiver: this.state.userChat })
                        }}
                    />

                </div>
            </div> : null
        );
    }
    //  masstraining
}
let mapStateToProps = (state) => {
    //  console.log(state.CAReducer.allUsers);
    return {
        chatData: state.CAReducer.chatData,
        allUsers: state.CAReducer.allUsers

    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        addMsg: (data) => { dispatch(CAAction.addMsg(data)) },
        addImg: (data) => { dispatch(CAAction.addImg(data)) }
    }
}

// export default ChatBox;
export default connect(mapStateToProps, mapDispatchToProps)(ChatBox)