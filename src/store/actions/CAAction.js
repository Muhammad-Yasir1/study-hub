

class CAAction {
    //-------- For Epic ---------------------------------
    static GET_CHAT_DATA = 'GET_CHAT_DATA';
    static GET_USERS = 'GET_USERS';
    static ADD_MSG = 'ADD_MSG';
    static ADD_IMAGE = 'ADD_IMAGE';
    //-------- For Reudcer ---------------------------------
    static GET_USER_ADD = 'GET_USER_ADD';
    static GET_CHAT_DATA_ADD = 'GET_CHAT_DATA_ADD';
    //-------- For Epic ---------------------------------
    static getChatData = ()=>{
        return {
            type : CAAction.GET_CHAT_DATA
        }
    }
    static getUser = ()=>{
        return {
            type : CAAction.GET_USERS
        }
    }
    static addMsg = (data)=>{
        return {
            type : CAAction.ADD_MSG,
            payload : data
        }
    }
    static addImg = (data)=>{
        return {
            type : CAAction.ADD_IMAGE,
            payload : data
        }
    }
    //-------- For Reudcer ---------------------------------
    static getUserAdd = (data)=>{
        return {
            type : CAAction.GET_USER_ADD,
            payload : data
        } 
    }
    static getChatDataAdd = (data)=>{
        return {
            type : CAAction.GET_CHAT_DATA_ADD,
            payload : data
        } 
    }
}

export default CAAction;