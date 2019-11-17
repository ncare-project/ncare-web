import React, { Component } from 'react'
import MenuBar from '../MenuBar/MenuBar'

export default class MainPage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <MenuBar handleUserExit={this.props.handleUserExit} 
                        isSignedIn={this.props.isSignedIn} />
            </div>
        )
    }
}
