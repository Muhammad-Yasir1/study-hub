import React, { Component } from 'react';
import logo from './logo.svg';
// import './App.css';
import Navbar from "../../components/navbar/navbar";
import LoginCard from '../login/login'
import RegisterCard from '../signup/signup'
class App extends Component {
  render() {
    return (
      <div>
       <Navbar/>
      </div>
    );
  }
}

export default App;
