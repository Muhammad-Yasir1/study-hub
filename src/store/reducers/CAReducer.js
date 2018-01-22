import CAAction from "../actions/CAAction";

let INITIAL_CA_STATE = {
    chatData : {},
    allUsers : {}

}

let CAReducer = ( state = INITIAL_CA_STATE  , action) =>{
    switch (action.type) {
        case CAAction.GET_USER_ADD : 
            let allUsers = Object.assign({} , state.allUsers);
            allUsers[action.payload.key] = action.payload.userData;
            return { ...state , allUsers }

        case 'LOGOUT' : 
            return { 
                chatData : {},
                allUsers : {}
             }
        case CAAction.GET_CHAT_DATA_ADD:
            let chatData = Object.assign({}, state.chatData);
            chatData[action.payload.key] = action.payload.msgData;
            return { ...state , chatData  };
        default:
            return state;
    }
}

export default CAReducer;