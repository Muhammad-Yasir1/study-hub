import { createStore, combineReducers, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

//requiring all reducers
import AuthReducer from './reducers/authReducer';
import CAReducer from "./reducers/CAReducer";
//requiring all epics
import AuthEpic from './epic/authEpic';
import CAEpic from "./epic/CAEpic";
//combine epic
const rootEpic = combineEpics(
    AuthEpic.createUser,
    AuthEpic.loginUser,
    CAEpic.addMsg,
    CAEpic.getChatData,
    CAEpic.getUsers,
    CAEpic.addImg
);
//combine reducers
const rootReducer = combineReducers({
    AuthReducer , CAReducer
})

//creating middleware
const epicMiddleware = createEpicMiddleware(rootEpic);

//appling middleware
const createStoreWithMiddleware = applyMiddleware(epicMiddleware)(createStore);

//creating store
export let store = createStoreWithMiddleware(rootReducer)
store.subscribe(()=>{
    console.log(store.getState())
});
