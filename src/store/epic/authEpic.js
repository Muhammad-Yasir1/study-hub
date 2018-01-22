

import { Observable } from 'rxjs'
import  AuthAction from "../actions/authAction";

import * as firebase from 'firebase';
 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyC9IgtllKhi17d8JaEKD7ttojZZOGab_u4",
    authDomain: "chat-7b31b.firebaseapp.com",
    databaseURL: "https://chat-7b31b.firebaseio.com",
    projectId: "chat-7b31b",
    storageBucket: "chat-7b31b.appspot.com",
    messagingSenderId: "871567611249"
  };
  firebase.initializeApp(config);
const ref = firebase.database().ref('/');
const auth = firebase.auth();
// let userData ;

class AuthEpic {

        static createUser = (action$)=>{
            let userCreated = false;
            return action$.ofType(AuthAction.CREATE_USER)
            .switchMap(({payload })=>{
                return Observable.fromPromise(
                    auth.createUserWithEmailAndPassword(payload.email,payload.password)
                    .then((res)=>{
                        delete payload.password;
                        ref.child(`users/${res.uid}`).set(payload);
                        userCreated = true;
                        // Action Dispatch for reducer to state change , and component render for 
                        // login OK use flages and dispatch at the bottom .map((x)=>{})
                        alert('User Successfully Created');
                        
                    }).catch((err)=>{
                        console.log(err)
                        alert(err.message)
                        
                    })
                )
                .map((x)=>{
                    return userCreated ? AuthAction.createUserSuccessfully('Naisr') : { type : null}
                })
            })
        }

        static loginUser = (action$)=>{
            let authenticate = false;
            return action$.ofType(AuthAction.LOGIN_USER)
            .switchMap(({payload })=>{
                return Observable.fromPromise(
                    auth.signInWithEmailAndPassword(payload.email,payload.password)
                    .then((res)=>{
                        authenticate = true;
                        localStorage.setItem('uid',res.uid)
                        // console.log(res.uid)
                        // send  userdata at the end for reducer
                        // ref.child(`users/${res.uid}/`).once('value',(s)=>{
                        //     console.log(s.val())
                        //     userData = s.val();
                        //     console.log(userData)
                        // });
                        return AuthAction.loginUserSuccessfully()
                    }).catch((err)=>{
                        alert(err.message)
                        return {type : null};
                    })
                )
                // .map((x)=>{
                //     return { type : AuthAction.LOGIN_USER_SUCCESSFULLY }
                //     // return   authenticate ? AuthAction.loginUserSuccessfully(userData) : {type : null}
                // })
            })
        }
}

export default AuthEpic;