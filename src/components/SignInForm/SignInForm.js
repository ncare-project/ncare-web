import React, { Component } from 'react'
import Cookies from 'universal-cookie'
import { Redirect } from 'react-router-dom'

const cookies = new Cookies()

export default class SignInForm extends Component { 
    constructor(props) {
        super(props)
        this.state = {
            hasSignedIn: false
        }


        this.submitForm = this.submitForm.bind(this)
    }

    submitForm() {
        // const socket = io(`${config.server_base_url}`)

        window.socket.emit('auth:sign_in', {
            email: this.emailInput.value,
            password: this.passwordInput.value
        })

        window.socket.on('auth:sign_in', data => {
            if (!data.res) { 
                // Положительный ответ от сервера
                
                cookies.set('id', data.user.id)
                cookies.set('token', data.user.token)
                this.props.handleSuccessefulAuthentication(data.user)
                this.setState({ hasSignedIn: true })
            } else {
                window.socket.close()
            }
        })
    }

    render() {
        return (
            <div>
                <input type='email' ref={node => this.emailInput = node}></input>
                <input type='password' ref={node => this.passwordInput = node}></input>
                <button onClick={this.submitForm}>Submit</button>

                {this.state.hasSignedIn ? <Redirect to='/'/> : ''}
            </div>
        )
    }
}
