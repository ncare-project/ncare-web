import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class componentName extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                {!this.props.isSignedIn ?
                    <>
                        <Link to='/sign_up'>Sign up</Link>
                        <Link to='/sign_in'>Sign in</Link>
                    </>
                : ''}

                {this.props.isSignedIn ? 
                    <>
                        <Link to='/profile'>Profile</Link>
                        <Link to='/create_organisation'>Create organisation</Link>
                        <span onClick={this.props.handleUserExit}>Sign out</span>
                    </>
                 : ''}
            </div>
        )
    }
}
