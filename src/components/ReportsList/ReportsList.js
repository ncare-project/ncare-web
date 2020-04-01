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
        this.updateReports = this.updateReports.bind(this)
        
        this.updateReports()
    }

    updateReports() {
        window.socket.on("updates:reports:new", data => {
            alert(`${data.report.name}: ${data.report.coordinates[0]} ${data.report.coordinates[1]}`)

            this.setState(prevState => ({
                reports: prevState.reports.concat(data.report)
            }))
        })
    }

    render() {
        const { classes } = this.props

        return (
            <div className='two-columns'>
                <MenuBar isSignedIn={this.props.isSignedIn} sideMenu/>

                <div className={classes.reportsList}>
                    {this.state.reports.map((report, index) => (
                        <div key={index} className={classes.reportCard}>
                            <h2>{report.name}</h2>
                            <p>{report.description}</p>
                            <p className={classes.reportPosition}>
                                {report.coordinates[1]} <br /> {report.coordinates[0]}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default injectStyles(styles)(ReportsList)