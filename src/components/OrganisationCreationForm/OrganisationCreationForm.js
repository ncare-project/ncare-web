import React, { Component } from 'react'
import Cookies from 'universal-cookie'
import MenuBar from '../MenuBar/MenuBar'

const cookies = new Cookies()

export default class OrganisationCreationForm extends Component { 
    constructor(props) {
        super(props)

        this.state = {
            org: null
        }

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

                this.props.handleOrganisationCreation(data.org)
            }
        })
    }

    render() {
        console.log(this.props.organisation.id);
        console.log('test');
        
        return (
            <div className='two-columns'>
                <MenuBar sideMenu handleUserExit={this.props.handleUserExit} isSignedIn={this.props.isSignedIn}/>
                {!this.props.organisation.id ?
                    <div>
                        <input ref={node => this.nameInput = node}></input>
                        <textarea cols={40} rows={10} ref={node => this.descriptionInput = node}></textarea>
                        <button onClick={this.submitForm}>Submit</button>
                    </div> :
                    <div>
                        <h2>{this.props.organisation.name}</h2>
                        <p>{this.props.organisation.description}</p>
                    </div>
                }
            </div>
        )
    }
}
