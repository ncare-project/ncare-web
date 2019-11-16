import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

export default class componentName extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSignedIn: cookies.get('token') ? true : false
        }

        this.handleUserExit = this.handleUserExit.bind(this)
    }

    handleUserExit() {
        this.setState({
            isSignedIn: false
        })

        cookies.remove('id')
        cookies.remove('token')
    }

    render() {
        return (
            <div>
                <Link to='/sign_up'>Sign up</Link>
                <Link to='/sign_in'>Sign in</Link>
                {this.state.isSignedIn ?
                    <div onClick={this.handleUserExit}>Exit</div> : ''}
            </div>
        )
    }
}
