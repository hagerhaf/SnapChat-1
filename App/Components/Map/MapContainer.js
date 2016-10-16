import React, {Component, PropTypes} from 'react'
import {View, Text} from 'react-native'
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
            latitudeDelta: this.state.latitudeDelta,
            longitudeDelta: this.state.longitudeDelta
          }
        })
      },
      (err) => console.log(err),
      {}
    )
  }

  onRegionChange (region) {
    this.setState({ region })
  }

  render () {
    return (
      <MapView
        style={styles.container}
        region={this.state.region}
        showsUserLocation
        onRegionChange={this.onRegionChange}
  />
    )
  }
}

MapContainer.propTypes = {

}

export default MapContainer
