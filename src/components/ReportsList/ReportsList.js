import React, { Component } from 'react'
import MenuBar from '../MenuBar/MenuBar'
import injectStyles from 'react-jss'
import styles from './ReportsListStyles'

class ReportsList extends Component {
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

        console.log(this.props)
    }

    render() {
        const { classes } = this.props

        return (
            <div className='two-columns'>
                <MenuBar isSignedIn={this.props.isSignedIn} sideMenu/>

                <div className={classes.reportsList}>
                    {this.state.reports.map((report, index) => (
                        <div className={classes.reportCard}>
                            <h2>{report.name}</h2>
                            <p>{report.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default injectStyles(styles)(ReportsList)