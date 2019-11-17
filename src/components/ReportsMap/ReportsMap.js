import React, { Component } from 'react'
import MenuBar from '../MenuBar/MenuBar'
import { YMaps, Map, Placemark, GeoObject } from 'react-yandex-maps'

export default class ReportsMap extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedPoint: null,
            markers: [
                {
                    hint: 'testdsgdsgds',
                    coordinates: [55.7, 37.6],
                    radius: 10000
                }
            ]
        }

        this.handleInfoEdit = this.handleInfoEdit.bind(this)
        this.getZones = this.getZones.bind(this)
        
        this.getZones()
    }

    getZones() {
        window.socket.emit('orgs:get_zones')

        window.socket.on('orgs:get_zones', data => {
            console.log(data)
            if (!data.res) { 
                // Положительный ответ от сервера
            }
        })
    }

    handleInfoEdit() {
        if (this.state.selectedPoint) {
            const selectedPoint = this.state.selectedPoint

            window.socket.emit('orgs:create_zone', {
                name: this.state.markers[selectedPoint].hint,
                coordinates: this.state.markers[selectedPoint].coordinates,
                radius: this.state.markers[selectedPoint].radius
            })

            window.socket.on('orgs:create_zone', data => {
                if (!data.res) { 
                    // Положительный ответ от сервера
                    

                }
            })
        }
    }

    render() {
        return (
            <div style={{height: '800px'}}>
                <MenuBar handleUserExit={this.props.handleUserExit} sideMenu isSignedIn={this.props.isSignedIn}>
                    <input ref={node => this.nameInput = node}></input>
                    <input ref={node => this.radiusInput = node}></input>
                    <button onClick={this.handleInfoEdit}>Submit</button>
                </MenuBar>
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
                        defaultState={{ center: [55.75, 37.57], zoom: 9 }}
                        onClick={e => this.setState(prevState => ({
                            selectedPoint: prevState.markers.length,
                            markers: prevState.markers.concat({
                                hint: '',
                                coordinates: e.get('coords'),
                                radius: 0
                            })
                        }))}>
                            {this.state.markers.map((marker, index) => (
                                <>
                                    <GeoObject
                                        onClick={() => {
                                            this.setState({
                                                selectedPoint: index
                                            })
                                        }}
                                        geometry={{
                                            type: 'Point',
                                            coordinates: marker.coordinates
                                        }}
                                        properties={{
                                            iconContent: marker.hint.slice(0, 10)
                                        }}
                                        options={{
                                            preset: `islands#${index === this.state.selectedPoint ? 'blue' : 'grey'}StretchyIcon`,
                                        }}
                                    />
                                    <GeoObject 
                                        geometry={{
                                            type: 'Circle',
                                            coordinates: [55.7, 37.6],
                                            radius: marker.radius
                                        }}
                                    />
                                </>
                            ))}
                    </Map>
                </YMaps>
            </div>
        )
    }
}
