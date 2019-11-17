import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

export default class MenuBar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={this.props.sideMenu ? 'side-menu' : ''}>
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
                        <Link to='/reports_map'>Map</Link>
                        <Link to='/create_organisation'>Create organisation</Link>
                        <span onClick={this.props.handleUserExit}>Sign out</span>
                    </>
                 : ''}
            </div>
        )
    }
}
