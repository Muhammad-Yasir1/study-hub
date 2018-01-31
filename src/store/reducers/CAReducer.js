import CAAction from "../actions/CAAction";

let INITIAL_CA_STATE = {
    chatData: {},
    allUsers: {},
    date : ''
}

let CAReducer = (state = INITIAL_CA_STATE, action) => {
    switch (action.type) {
        case 'UPDATE_DATE':
            return { ...state ,date : new Date() }
        case CAAction.GET_USER_ADD:
            let allUsers = Object.assign({}, state.allUsers);
            allUsers[action.payload.key] = action.payload.userData;
            return { ...state, allUsers }

        case 'LOGOUT':
            return {
                chatData: {},
                allUsers: {}
            }
        case CAAction.GET_CHAT_DATA_ADD:
            let chatData = Object.assign({}, state.chatData);
            chatData[action.payload.key] = action.payload.msgData;
            return { ...state, chatData };
        case CAAction.GET_MSG_DELETE:
            let chatDataa = Object.assign({}, state.chatData);
            delete chatDataa[action.payload];
            return { ...state, chatData : chatDataa };

        case CAAction.GET_MSG_UPDATE:
            let chatdDataaa = Object.assign({}, state.chatData);
            chatdDataaa[action.payload.key] = action.payload.msgData;
            return { ...state, chatData : chatdDataaa };
        default:
            return state;
    }
}

export default CAReducer;