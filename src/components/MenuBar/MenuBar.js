import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import injectStyles from 'react-jss'
import styles from './MenuBarStyles'
import AppLogo from '../AppLogo/AppLogo'

class MenuBar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { classes } = this.props

        return (
            <div className={this.props.sideMenu ? `${classes.sideMenu}` : ''}>
                <AppLogo secondary/>
                {!this.props.isSignedIn ?
                    <>
                        <Link to='/sign_up'>Sign up</Link>
                        <Link to='/sign_in'>Sign in</Link>
                        <Redirect to='/'/>
                    </>
                : ''}

                {this.props.isSignedIn ? 
                    <>
                        <Link to='/profile'>Profile</Link>
                        <Link to='/reports_list'>Reports</Link>
                        <Link to='/reports_map'>Map</Link>
                        <Link to='/create_organisation'>Create organisation</Link>
                        <a onClick={this.props.handleUserExit}>Sign out</a>
                    </>
                 : ''}

                 <hr />

                 {this.props.children}
            </div>
        )
    }
}

export default injectStyles(styles)(MenuBar)