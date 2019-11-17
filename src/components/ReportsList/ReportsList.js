import React, { Component } from 'react'

export default class ReportsList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            reports: []
        }

        window.socket.emit('reports:get')

        window.socket.on('reports:get', data => {
            if (!data.res) { 
                // Положительный ответ от сервера
                
                this.setState({ reports: data.reports })
            }
        })
    }

    render() {
        return (
            <div>
                {this.state.reports.map((report, index) => (
                    <div>
                        <h2>{report.title}</h2>
                        <p>{report.description}</p>
                    </div>
                ))}
            </div>
        )
    }
}
