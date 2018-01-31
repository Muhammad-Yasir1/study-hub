import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import CAAction from "../../store/actions/CAAction";
import * as firebase from "firebase";
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const style = {
    margin: 12,
};

const msg = {
    // textAlign : 'left',
    backgroundColor: 'lightgreen',
    border: '3px solid lightgreen',
    margin: '5px 20px',
    borderRadius: 10,
    padding: 5,

}
let imgStyle = {
    border: '2px solid lightgreen',
    margin: '5px 20px',
    borderRadius: 20,
    padding: 0,
}
//   const userId = firebase.auth().currentUser.uid;
class ChatBox extends Component {
    constructor() {
        super();
        this.state = {
            msg: '',
            userChat: null,
            img: '',
            isEdit: false
            , editMsg: ''
        }
        setInterval(() => {
            // console.log('asdas');
            this.props.updateDate();
        }, 1000);

    }
    componentDidMount() {


    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps.userChat);
        this.setState({ userChat: nextProps.userChat });
        // <Card>
        // <CardTitle title="" subtitle="SignUp Here !" />
        //             </Card>

        // this.refs.chatBox.scrollTo(0, this.refs.chatBox.scrollHeight);
    }
    scrollAtBottom = () => {
    }
    render() {

        // this.scrollAtBottom();
        // console.log(this.props.userChat);
        // var el = this.refs.chatBox;
        // el.style.scrollTop = 100; 
        return (
            this.props.userChat ? <div style={{}}>
                <CardTitle style={{ fontSize: 22, padding: 10 }}
                    title={this.props.userChat !== undefined ? this.props.allUsers[this.props.userChat] !== undefined ? this.props.allUsers[this.props.userChat].name : null : null}
                    subtitle="Lets Chat !"
                ></CardTitle>
                <div ref='chatBox' style={{ overflow: 'auto', height: 350, maxHeight: 400, width: '100%', border: '2px solid brown' }}>
                    {/* To Chat This Person */}
                    {/* <Card> */}

                    {/* </Card> */}
                    {/* To Chat This Person Adove */}


                    {this.props.userChat !== null ? this.props.chatData !== undefined ?
                        Object.keys(this.props.chatData).map((chatKey, i) => {

                            let oneMsg = this.props.chatData[chatKey];
                            if ((oneMsg.receiver === this.props.userChat && oneMsg.sender === firebase.auth().currentUser.uid) ||
                                (oneMsg.sender === this.props.userChat && oneMsg.receiver === firebase.auth().currentUser.uid)) {
                                let demo = new Date(oneMsg.time)
                                if (oneMsg.type === 'IMG') {
                                    setTimeout(() => {
                                        this.refs.chatBox !== undefined ? this.refs.chatBox.scrollBy(0, 800) : null;
                                    }, 100);
                                    return <div key={chatKey} style={oneMsg.sender === firebase.auth().currentUser.uid ? { textAlign: 'right' } : { textAlign: 'left' }}>
                                        <span>{`${demo.getHours()} : ${demo.getMinutes()} : ${demo.getSeconds()}`}</span> <img src={oneMsg.img} alt='Sended Photo'
                                            style={{ maxHeight: 350, maxWidth: 300, ...imgStyle }} />
                                    </div>
                                } else {
                                    setTimeout(() => {
                                        this.refs.chatBox !== undefined ? this.refs.chatBox.scrollBy(0, 300) : null;
                                    }, 100);
                                    return (<TextMsg currentDate={this.props.currentDate}
                                        key={chatKey} deleteMsg={this.props.deleteMsg} userChat={this.state.userChat}
                                        chatKey={chatKey} demo={demo} oneMsg={oneMsg} />)


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
                                time: time.toString(),
                                sender: firebase.auth().currentUser.uid,
                                receiver: this.props.userChat,
                                // time : 
                            }
                            // console.log(msg);
                            this.props.addMsg(msg);
                            this.setState({ msg: '' });


                        }}
                    />
                    <TextField
                        type='file'
                        // value={this.state.img}
                        onChange={(e) => { this.setState({ img: e.target.files[0] }) }}
                    />

                    <RaisedButton disabled={this.state.img ? false : true} type='file' label="Upload Image" secondary={true} style={style}
                        onClick={() => {
                            this.props.addImg({ file: this.state.img, receiver: this.props.userChat })
                            this.setState({ img: null })

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
        allUsers: state.CAReducer.allUsers,
        currentDate: state.CAReducer.date

    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        addMsg: (data) => { dispatch(CAAction.addMsg(data)) },
        addImg: (data) => { dispatch(CAAction.addImg(data)) },
        updateMsg: (data) => { dispatch(CAAction.updateMsg(data)) },
        deleteMsg: (data) => { dispatch(CAAction.deleteMsg(data)) },
        updateDate: () => { dispatch({ type: 'UPDATE_DATE' }) }

    }
}

// export default ChatBox;
export default connect(mapStateToProps, mapDispatchToProps)(ChatBox)



class TextMsg extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEdit: false,
            editMsg: this.props.oneMsg.msg
        }

    }



    render() {
        // console.log(this.props.currentDate);
        var diff = Math.abs(this.props.currentDate - new Date(this.props.demo));
        var minutes = Math.floor((diff / 1000) / 60);
        console.log(minutes);
        return (

            <p key={this.props.chatKey}
                style={this.props.oneMsg.sender === firebase.auth().currentUser.uid ? { textAlign: 'right' } : { textAlign: 'left' }}>
                {minutes < 1 ? <span>
                    <FlatButton label={this.state.isEdit ? 'Update' : 'Edit'} onClick={() => {
                        if (this.state.isEdit) {
                            let updateMsg = {
                                key: this.props.chatKey,
                                msg: {
                                    type: 'TEXT',
                                    msg: this.state.editMsg,
                                    time: Date().toString(),
                                    sender: firebase.auth().currentUser.uid,
                                    receiver: this.props.userChat,
                                }
                            }
                            this.props.updateMsg(updateMsg)
                            this.setState({ isEdit: !this.state.isEdit })
                            // this.setState({ isEdit: true })
                        } else {

                            this.setState({ isEdit: !this.state.isEdit })
                        }

                    }} primary={true} />
                    <FlatButton label="Delete" onClick={() => {
                        this.props.deleteMsg(this.props.chatKey)
                    }} secondary={true} />
                </span> : null}{`${this.props.demo.getHours()} : ${this.props.demo.getMinutes()} : ${this.props.demo.getSeconds()}`}
                {this.state.isEdit ? <span style={msg}>
                    <TextField
                        value={this.state.editMsg}
                        onChange={(e) => { this.setState({ editMsg: e.target.value }) }}
                    /></span> : <span style={msg}>{this.props.oneMsg.msg}</span>}

            </p>);
    }
}

