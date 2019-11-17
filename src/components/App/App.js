import React, { Component } from 'react'
import MainPage from '../MainPage/MainPage'
import SignUpForm from '../SignUpForm/SignUpForm'
import SignInForm from '../SignInForm/SignInForm'
import OrganisationCreationForm from '../OrganisationCreationForm/OrganisationCreationForm'
import UserProfile from '../UserProfile/UserProfile'
import ReportsMap from '../ReportsMap/ReportsMap'
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom'
import io from 'socket.io-client'
import config from '../../config'
import Cookies from 'universal-cookie'
import injectStyles from 'react-jss'
import styles from './AppStyles'

const cookies = new Cookies()
window.socket = io(`${config.server_base_url}`)

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isSignedIn: false,
            user: {}
        }

        this.handleUserExit = this.handleUserExit.bind(this)
        this.handleSuccessefulAuthentication = this.handleSuccessefulAuthentication.bind(this)
        this.connectSocket = this.connectSocket.bind(this)

        this.connectSocket()
    }

    connectSocket() {
        window.socket.on('connect', () => {
            window.socket.emit('auth:import_auth', {
                id: cookies.get('id'),
                token: cookies.get('token')
            })
        
            window.socket.on('auth:import_auth', data => {
                if (!data.res) {
                    // Положительный ответ сервера
        
                    this.setState({
                        isSignedIn: true,
                        user: data.user
                    })
                }
            })
        })
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
                     <OrganisationCreationForm isSignedIn={this.state.isSignedIn} handleUserExit={this.handleUserExit}/>
                }/>
                <Route path='/reports_map' render={() =>
                     <ReportsMap isSignedIn={this.state.isSignedIn} handleUserExit={this.handleUserExit}/>
                }/>
                <Route path='/profile' render={() => 
                    <UserProfile user={this.state.user} isSignedIn={this.state.isSignedIn} handleUserExit={this.handleUserExit}/>
                }/>
            </Router>
        )
    }
}

export default injectStyles(styles)(App)