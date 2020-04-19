import React, { Fragment } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Permission from 'expo-permissions'
import Search from '../Search';
import Directions from '../Directions';
import { getPixelSize } from '../utils';


import markerImage from '../Assets/petpata.png';

import { LocationBox, LocationText, LocationTimeBox, LocationTimeText, LocationTimeTextSmall } from './styles';

export default class Map extends React.Component {

    state = {
        region: null,
        destination: {
   
            latitude: -25.460131,
            longitude: -49.185384,

        }
    };

    async componentDidMount() {
        await Permission.askAsync(Permission.LOCATION);
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                this.setState({
                    region: {
                        latitude,
                        longitude,
                        latitudeDelta: 0.0143,
                        longitudeDelta: 0.0134
                    }
                });
            }, //sucesso
            () => { }, //erro
            {
                timeout: 2000,
                enableHighAccuracy: true,
                maximumAge: 1000,
            }
        )

    }
    //
    handleLocationSelected = (data, { geometry }) => {
        const { location: { lat: latitude, lng: longitude } } = geometry;
        this.setState({
            destination: {
                latitude,
                longitude,
                title: data.structured_formatting.main_text,
            }
        })
    }
    render() {
        const { region, destination } = this.state;
        return (

            <View style={{ flex: 1 }}>
                <MapView style={{ flex: 1 }}
                    region={region}
                    showsUserLocation
                    loadingEnabled
                    ref={el => this.MapView = el}>
                    <Fragment>
                        <Directions
                            origin={region}
                            destination={destination}
                            onReady={
                                result => {
                                    this.MapView.fitToCoordinates(result.coordinates, {
                                        edgePadding: {
                                            right: getPixelSize(50),
                                            left: getPixelSize(50),
                                            top: getPixelSize(50),
                                            bottom: getPixelSize(50)
                                        }
                                    });
                                }
                            } />
                        <Marker coordinate={destination} anchor={{ x: 0, y: 0 }} image={markerImage}>
                            <LocationBox>
                                <LocationText>PetShop</LocationText>
                            </LocationBox>
                        </Marker>


                        <Marker coordinate={region} anchor={{ x: 0, y: 0 }}>
                           
                        </Marker>
                    </Fragment>

                </MapView>
                <Search onLocationSelected={this.handleLocationSelected} />
            </View>

        );
    }









}
