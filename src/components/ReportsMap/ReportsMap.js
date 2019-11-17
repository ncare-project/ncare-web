import React, { Component } from 'react'
import Map from 'pigeon-maps'
import Marker from 'pigeon-marker'
import MenuBar from '../MenuBar/MenuBar'

export default class ReportsMap extends Component {
    constructor(props) {
        super(props)

        this.state = {
            markers: [[55.7, 37.6]]
        }
    }

    render() {
        return (
            <div style={{height: '800px'}}>
                <MenuBar handleUserExit={this.props.handleUserExit} sideMenu isSignedIn={this.props.isSignedIn}/>
                <Map center={[55.7007, 37.6]} zoom={10} onClick={data => {
                    this.setState(prevState => ({
                        markers: prevState.markers.concat([data.latLng])
                    }))
                }}>
                    {this.state.markers.map((marker, index) => (
                        <Marker key={`marker-${index}`} anchor={marker}/>
                    ))}
                </Map>
            </div>
        )
    }
}
