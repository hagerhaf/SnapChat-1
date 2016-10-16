import React, {Component, PropTypes} from 'react'
import {View, Text, MapView} from 'react-native'
// import MapView from 'react-native-maps'
import {mapStyles as styles} from './MapStyles'

class MapContainer extends Component {
  render () {
    return (
      <MapView
        style={styles.container}
        followUserLocation
        showsUserLocation
  />
    )
  }
}

MapContainer.propTypes = {

}

export default MapContainer
