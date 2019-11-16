import React, { Component } from 'react'
import MainPage from './MainPage'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import io from 'socket.io-client'
import config from '../config'

export default class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {    
        return (
            <Router>
                <Route path='/' exact component={MainPage}/>
                <Route path='/sign_up' component={SignUpForm}/>
                <Route path='/sign_in' component={SignInForm}/>
            </Router>
        )
    }
}
