import React from 'react';
// import MobileTearSheet from '../../../MobileTearSheet';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import ChatBox from "../chatBox/chatbox";
import { connect } from "react-redux";
import CAAction from '../../store/actions/CAAction';
import * as firebase from 'firebase'


class MainApplication extends React.Component {
  constructor(){
    super();
    this.state = {
      userChat : ''
    }
   
  }
  componentDidMount(){
    this.props.getChatData();
    this.props.getUsers();
  }
  render() {
    return (
      <div>
        <List>
          <ListItem
            disabled={true}
            leftAvatar={<Avatar src={this.props.allUsers[firebase.auth().currentUser.uid] !== undefined ? 
                        this.props.allUsers[firebase.auth().currentUser.uid].photoURL : null } />}>
                      {this.props.allUsers[firebase.auth().currentUser.uid] !== undefined ? 
                        this.props.allUsers[firebase.auth().currentUser.uid].name : null }
      </ListItem>
        </List>

        <div style={{ display: 'flex' }}>


          <List style={{ width: '25%' }}>
            <Subheader>Recent chats</Subheader>
            { Object.keys(this.props.allUsers).map((uid,i)=>{
              let user = this.props.allUsers[uid];
              return (
                <ListItem key={uid}
                  // userId = {uid}
                  onClick={()=>{ this.setState({ userChat: uid })}}
                  primaryText={user.name}
                  leftAvatar={<Avatar src={user.photoURL} />}
                  rightIcon={<CommunicationChatBubble />}
                />
              )
            })

            }
            
          </List>
          <ChatBox userChat={this.state.userChat} />
        </div>
      </div>
    );

  }
}




let mapStateToProps = (state) => {
  return {
    allUsers: state.CAReducer.allUsers
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    getChatData : ()=>{ dispatch(CAAction.getChatData())},
    getUsers : ()=>{ dispatch(CAAction.getUser())},
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainApplication)