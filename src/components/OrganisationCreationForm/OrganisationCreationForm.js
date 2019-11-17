import React, { Component } from 'react'
import io from 'socket.io-client'
import config from '../../config'
import Cookies from 'universal-cookie'
import MenuBar from '../MenuBar/MenuBar'

const cookies = new Cookies()

export default class OrganisationCreationForm extends Component { 
    constructor(props) {
        super(props)

        this.submitForm = this.submitForm.bind(this)
    }

    submitForm() {
        window.socket.emit('orgs:create', {
            name: this.nameInput.value,
            description: this.descriptionInput.value
        })

        window.socket.on('orgs:create', data => {
            if (!data.res) { 
                // Положительный ответ от сервера

                this.setState({ hasSignedIn: true })
            }
        })
    }

    render() {
        return (
            <div>
                <MenuBar sideBar handleUserExit={this.props.handleUserExit} isSignedIn={this.props.isSignedIn}/>
                <input ref={node => this.nameInput = node}></input>
                <textarea cols={40} rows={10} ref={node => this.descriptionInput = node}></textarea>
                <button onClick={this.submitForm}>Submit</button>
            </div>
        )
    }
}
