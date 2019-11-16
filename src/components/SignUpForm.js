import React, { Component } from 'react'
import io from 'socket.io-client'
import config from '../config'
import Cookies from 'universal-cookie'
import { Redirect } from 'react-router-dom'

const cookies = new Cookies()

export default class SignUpForm extends Component { 
    constructor(props) {
        super(props)
        this.state = {
            hasSignedUp: false
        }

        this.submitForm = this.submitForm.bind(this)
    }

    submitForm(e) {
        // const socket = io(`${config.server_base_url}`)

        window.socket.emit('auth:sign_up', {
            email: this.emailInput.value,
            password: this.passwordInput.value,
            nickname: this.nicknameInput.value
        })

        window.socket.on('auth:sign_up', data => {
            if (!data.res) { 
                // Положительный ответ от сервера

                cookies.set('id', data.user.id)
                cookies.set('token', data.user.token)
                this.props.handleSuccessefulAuthentication(data.user)
                this.setState({ hasSignedUp: true })
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
                <input ref={node => this.nicknameInput = node}></input>
                <button onClick={this.submitForm} >Submit</button>

                {this.state.hasSignedUp ? <Redirect to='/'/> : ''}
            </div>
        )
    }
}
