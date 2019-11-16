import React, { Component } from 'react'
import MainPage from './MainPage'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'
import OrganisationCreationForm from './OrganisationCreationForm'
import UserProfile from './UserProfile'
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

        this.handleUserExit = this.handleUserExit.bind(this)
        this.checkIfSignedIn = this.checkIfSignedIn.bind(this)
        this.handleSuccessefulAuthentication = this.handleSuccessefulAuthentication.bind(this)
        this.checkIfSignedIn()
    }

    checkIfSignedIn() {
        const socket = io(`${config.server_base_url}`)
        
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
                }

                socket.close()
            })
        } else {
            socket.close()
        }
    }

    handleUserExit() {
        cookies.remove('id')
        cookies.remove('token')

        this.setState({
            isSignedIn: false
        })
    }

    handleSuccessefulAuthentication(user) {
        this.setState({
            isSignedIn: true,
            user
        })
    }

    render() {
        return (
            <Router>
                <Route path='/' exact render={() =>
                     <MainPage handleUserExit={this.handleUserExit} isSignedIn={this.state.isSignedIn} />
                }/>
                <Route path='/sign_in' render={() =>
                     <SignInForm handleSuccessefulAuthentication={this.handleSuccessefulAuthentication} />
                }/>
                <Route path='/sign_up' render={() =>
                     <SignUpForm handleSuccessefulAuthentication={this.handleSuccessefulAuthentication} />
                }/>
                <Route path='/create_organisation' render={() =>
                     <OrganisationCreationForm />
                }/>
                <Route path='/profile' render={() => 
                    <UserProfile user={this.state.user} />
                }/>
            </Router>
        )
    }
}
