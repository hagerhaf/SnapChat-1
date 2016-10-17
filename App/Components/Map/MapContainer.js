import React, {Component, PropTypes} from 'react'
import {View, Text, Image, TouchableWithoutFeedback} from 'react-native'
import MapView from 'react-native-maps'
import {mapStyles as styles} from './MapStyles'

class MapContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    }

    this.onRegionChange = this.onRegionChange.bind(this)
  }

  componentWillMount () {
    navigator.geolocation.getCurrentPosition(
      ({coords, timestamp}) => {
        this.setState({
          region: {
            longitude: coords.longitude,
            latitude: coords.latitude,
            latitudeDelta: this.state.region.latitudeDelta,
            longitudeDelta: this.state.region.longitudeDelta
          }
        })
        this.forceUpdate()
      },
      (err) => console.log(err),
      {}
    )
  }

  onRegionChange (region) {
    this.setState({ region })
  }

  render () {
    console.log(this.state)
    return (
      <MapView
        style={styles.container}
        region={this.state.region}
        showsUserLocation
        onRegionChange={this.onRegionChange}
  >
        <MapView.Marker
          coordinate={{latitude: this.state.region.latitude,
        longitude: this.state.region.longitude}}
          title={'username here'}
          centerOffset={{ x: -18, y: -60 }}
          anchor={{ x: 0.69, y: 1 }}
          onPress={() => console.log('change')}
>
          <Text> Apple </Text>
          <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} style={{width: 20, height: 20}} />
        </MapView.Marker>
      </MapView>
    )
  }
}

MapContainer.propTypes = {

}

export default MapContainer
