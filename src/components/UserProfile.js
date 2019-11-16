import React, { Component } from 'react'

export default class UserProfile extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        // console.log(this.props)
        const userInfo = this.props.user

        return (
            <div>
                <h1>{userInfo.nickname}</h1>
                <p>{userInfo.email}</p>
            </div>
        )
    }
}
