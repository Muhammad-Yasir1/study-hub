import React, { Component } from 'react'
import LoginCard from '../login/login'
import RegisterCard from '../signup/signup'
import App from '../app/App';
import MainApplication from "../MianApplication/MianApplication";
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import { connect } from 'react-redux';


let mapStateToProps = (state) => {
    return {
        isLogin: state.AuthReducer.isLogin,
        registerShow: state.AuthReducer.registerShow
    }
}
let mapDispatchToProps = (dispatch) => {
    return {

    }
}
class Main extends Component {
    render() {
        return (
            <div>

                <div>
                    {
                        this.props.isLogin ?
                            <div>
                                <App />
                                <MainApplication/>
                            </div>
                            :
                            <div>
                                <App />
                                <Router>
                                    <div>
                                        {this.props.registerShow ?
                                            <Route path='/' component={RegisterCard} /> :
                                            <Route path='/' component={LoginCard} />
                                        }
                                    </div>
                                </Router>
                            </div>
                    }
                </div>


            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main)
