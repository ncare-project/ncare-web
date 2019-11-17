import React, { Component } from 'react'
import SignUpForm from '../SignUpForm/SignUpForm'
import SignInForm from '../SignInForm/SignInForm'
import OrganisationCreationForm from '../OrganisationCreationForm/OrganisationCreationForm'
import UserProfile from '../UserProfile/UserProfile'
import ReportsMap from '../ReportsMap/ReportsMap'
import ReportsList from '../ReportsList/ReportsList'
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
            isAdmin: false,
            user: {},
            organisation: {}
        }

        this.handleUserExit = this.handleUserExit.bind(this)
        this.handleSuccessefulAuthentication = this.handleSuccessefulAuthentication.bind(this)
        this.connectSocket = this.connectSocket.bind(this)
        this.handleOrganisationCreation = this.handleOrganisationCreation.bind(this)

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

            window.socket.emit('orgs:get')
        
            window.socket.on('orgs:get', data => {
                console.log(data)
                if (!data.res) {
                    // Положительный ответ сервера
        
                    this.setState({
                        isAdmin: true,
                        organisation: data.org
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

    handleOrganisationCreation(organisation) {
        this.setState({
            isAdmin: true,
            organisation
        })
    }

    render() {
        return (
            <Router>
                <Route path='/sign_in' render={() =>
                     <SignInForm isSignedIn={this.state.isSignedIn} handleSuccessefulAuthentication={this.handleSuccessefulAuthentication} />
                }/>
                <Route path='/' exact render={() =>
                     <SignUpForm isSignedIn={this.state.isSignedIn} handleSuccessefulAuthentication={this.handleSuccessefulAuthentication} />
                }/>
                <Route path='/create_organisation' render={() =>
                     <OrganisationCreationForm isSignedIn={this.state.isSignedIn} 
                                            handleUserExit={this.handleUserExit}
                                            handleOrganisationCreation={this.handleOrganisationCreation}
                                            organisation={this.state.organisation} />
                }/>
                <Route path='/reports_list' render={() =>
                     <ReportsList isSignedIn={this.state.isSignedIn} handleUserExit={this.handleUserExit}/>
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