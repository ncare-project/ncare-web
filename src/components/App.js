import React, { Component } from 'react'
import MainPage from './MainPage'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import io from 'socket.io-client'
import config from '../config'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

export default class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isSignedIn: false,
            user: {}
        }

        this.checkIfSignedIn = this.checkIfSignedIn.bind(this)
        this.checkIfSignedIn()
    }

    checkIfSignedIn() {
        const socket = io(config.server_base_url)

        if (cookies.get('id') && cookies.get('token')) {
            socket.emit('auth:import_auth', {
                id: cookies.get('id'),
                token: cookies.get('token')
            })

            socket.on('auth:import_auth', data => {
                if (!data.res) {
                    // Положительный ответ сервера

                    this.setState({
                        isSignedIn: true,
                        user: data.user
                    })
                } else {
                    socket.close()
                }
            })
        }
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
