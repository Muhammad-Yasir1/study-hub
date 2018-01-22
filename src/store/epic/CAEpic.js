import * as firebase from "firebase";

import CAAction from "../actions/CAAction";
import { Observable } from 'rxjs'

let ref = firebase.database().ref('/');
// let userId  = firebase.auth().currentUser.uid;
let userRef = ref.child('users');
// ref.push({nasdnas : 'smdasdas'});
export default class CAEpic {

    static getChatData = (action$)=>{
        return action$.ofType(CAAction.GET_CHAT_DATA)
            .switchMap(({ payload })=>{
                return new Observable((observer)=>{
                    ref.child(`chatData/`).on('child_added',(s)=>{
                        observer.next({
                            type: CAAction.GET_CHAT_DATA_ADD,
                            payload : {
                                key : s.key,
                                msgData : s.val()
                            }
                        })
                    })
                })
            })
}

    static addMsg = (action$)=>{
        return action$.ofType(CAAction.ADD_MSG)
        .switchMap(({ payload })=>{
            // console.log(payload)
            return Observable.fromPromise(
                ref.child(`chatData/`).push(payload).then(()=>{
                    // console.log('nasir')
                })
            )
            .map((x)=>{
                return { type : null }
            })
        })
    }
    static addImg = (action$)=>{
        return action$.ofType(CAAction.ADD_IMAGE)
        .switchMap(({ payload })=>{
            // console.log(payload)
            return Observable.fromPromise(
                firebase.storage().ref(`pictures/${payload.file.name}`).put(payload.file).then((res) => {
                    let time = new Date();
                    let msg = {
                        type: 'IMG',
                        img: res.downloadURL,
                        time: time,
                        sender: firebase.auth().currentUser.uid,
                        receiver: payload.receiver
                    }
                    // console.log(msg);
                    // this.props.addImg(this.state.img);
                    console.log(res.downloadURL);
                    return CAAction.addMsg(msg)
                })
            )
            // .map((x)=>{
            //     return { type : null }
            // })
        })
    }

    static getUsers = (action$) => {
        return action$.ofType(CAAction.GET_USERS)
            .switchMap(({
                payload
            }) => {
                return new Observable((observer) => {
                    userRef.on('child_added', (s) => {
                        observer.next({
                            type: CAAction.GET_USER_ADD,
                            payload: {
                                key: s.key,
                                userData: s.val()
                            }
                        })
                    })
                    

                }).takeUntil(action$.ofType('LOGOUT'));
            })
    }


}