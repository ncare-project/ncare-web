import React, { Component } from 'react'
import MenuBar from '../MenuBar/MenuBar'
import { YMaps, Map, Placemark, GeoObject } from 'react-yandex-maps'

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
                {/* <Map center={[55.7007, 37.6]} zoom={10} onClick={data => {
                    this.setState(prevState => ({
                        markers: prevState.markers.concat([data.latLng])
                    }))
                }}>
                    {this.state.markers.map((marker, index) => (
                        <Marker key={`marker-${index}`} anchor={marker}/>
                    ))}
                </Map> */}
                <YMaps>
                    <Map width={'100%'} height={'100vh'} 
                        defaultState={{ center: [55.75, 37.57], zoom: 9 }}>
                            <GeoObject 
                                geometry={{
                                    type: 'Circle',
                                    coordinates: [55.7, 37.6],
                                    radius: 30000
                                }}
                            />

                            {this.state.markers.map((marker, index) => (
                                <GeoObject 
                                    geometry={{
                                        type: 'Point',
                                        coordinates: marker
                                    }}
                                />
                            ))}
                    </Map>
                </YMaps>
            </div>
        )
    }
}
