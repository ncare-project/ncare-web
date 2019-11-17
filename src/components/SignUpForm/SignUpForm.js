import React, { Component } from 'react'
import Cookies from 'universal-cookie'
import { Redirect, Link } from 'react-router-dom'
import injectStyles from 'react-jss'
import styles from './SignUpFormStyles'
import AppLogo from '../AppLogo/AppLogo'

const cookies = new Cookies()

class SignUpForm extends Component { 
    constructor(props) {
        super(props)
        this.state = {
            hasSignedUp: false
        }

        this.submitForm = this.submitForm.bind(this)
    }

    submitForm() {
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
            }
        })
    }

    render() {
        const { classes } = this.props

        return (
            <>
                <AppLogo primary/>
                <div className={classes.authCard}>
                    <div className={classes.rightCard}>
                        <h2>Sign Up</h2>
                        <div className={classes.inputBox}>
                            <p className={classes.inputLabel}>E-mail</p>
                            <input type='email' ref={node => this.emailInput = node} placeholder={'Enter your e-mail'}></input>
                        </div>
                        <div className={classes.inputBox}>
                            <p className={classes.inputLabel}>Password</p>
                            <input type='password' ref={node => this.passwordInput = node} placeholder={'Enter your password'}></input>
                        </div>
                        <div className={classes.inputBox}>
                            <p className={classes.inputLabel}>Nickname</p>
                            <input ref={node => this.nicknameInput = node} placeholder={'Enter your nickname'}></input>
                        </div>       
                        
                        <div className={classes.formBtn} onClick={this.submitForm}>Sign up</div>
                    </div>

                    <div className={classes.leftCard}>
                        <h2>Are you already a user?</h2>
                        <Link to='/sign_in'>Sign in</Link>
                    </div>
                    {this.state.hasSignedUp || this.props.isSignedIn ? <Redirect to='/reports_list'/> : ''}
                </div>
            </>
        )
    }
}

export default injectStyles(styles)(SignUpForm)