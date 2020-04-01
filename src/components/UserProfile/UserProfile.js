import React, { Component } from 'react'
import MenuBar from '../MenuBar/MenuBar'

export default class UserProfile extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const userInfo = this.props.user

        return (
            <div className='two-columns'>
                <MenuBar sideMenu handleUserExit={this.props.handleUserExit} isSignedIn={this.props.isSignedIn}/>
                <div className='user-profile'>
                    <img src='https://i.pinimg.com/originals/79/75/86/797586ded43341c9e663d7780e600c30.png' />
                    <h1>{userInfo.nickname}</h1>
                    <p>{userInfo.email}</p>
                </div>
            </div>
        )
    }
}
