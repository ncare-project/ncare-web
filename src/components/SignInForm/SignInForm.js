import React, { Component } from 'react'
import Cookies from 'universal-cookie'
import { Redirect, Link } from 'react-router-dom'
import injectStyles from 'react-jss'
import styles from './SignInFormStyles'
import AppLogo from '../AppLogo/AppLogo'

const cookies = new Cookies()

class SignInForm extends Component { 
    constructor(props) {
        super(props)
        this.state = {
            hasSignedIn: false
        }

        this.submitForm = this.submitForm.bind(this)
    }

    submitForm() {
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
                        <h2>Sign in</h2>
                        <div className={classes.inputBox}>
                            <p className={classes.inputLabel}>E-mail</p>
                            <input type='email' ref={node => this.emailInput = node} placeholder={'Enter your e-mail'}></input>
                        </div>
                        <div className={classes.inputBox}>
                            <p className={classes.inputLabel}>Password</p>
                            <input type='password' ref={node => this.passwordInput = node} placeholder={'Enter your password'}></input>
                        </div>
                        <div className={classes.formBtn} onClick={this.submitForm}>Sign in</div>
                    </div>

                    <div className={classes.leftCard}>
                        <h2>Are you new on the site?</h2>
                        <Link to='/'>Sign up</Link>
                    </div>
                    {this.state.hasSignedIn || this.props.isSignedIn ? <Redirect to='/reports_list'/> : ''}
                </div>
            </>
        )
    }
}

export default injectStyles(styles)(SignInForm)