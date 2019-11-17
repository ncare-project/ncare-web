import React, { Component } from 'react'
import MenuBar from '../MenuBar/MenuBar'

export default class componentName extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <MenuBar isSignedIn={this.props.isSignedIn} />
            </div>
        )
    }
}
