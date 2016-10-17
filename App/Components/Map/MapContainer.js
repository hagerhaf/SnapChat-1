import React, {Component, PropTypes} from 'react'
import {View, Text, MapView, Image, TouchableOpacity} from 'react-native'
// import MapView from 'react-native-maps'
import {mapStyles as styles} from './MapStyles'
import deepcopy from 'deepcopy'

class MapContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      region: {
        latitude: -37.775852,
        longitude: 144.96625,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      markers: {}
    }

    this.onRegionChange = this.onRegionChange.bind(this)
    this.createMarkers = this.createMarkers.bind(this)
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

  componentWillReceiveProps (nextProps) {
    this.createMarkers(nextProps.stories)
  }

  createMarkers (friendsList) {
    console.log('stories recieved', friendsList)

    friendsList.map((friend) => {
      if (friend.stories) {
        // create an entry for each story
        friend.stories.forEach((story) => {
          if (story.storyInfo.coords) {
            let newMarkers = deepcopy(this.state.markers)
            newMarkers[story.url] = {story, username: friend.username, key: friend.key}
            this.setState({
              markers: newMarkers
            })
          }
        })
      }
    })
  }

  createAnnotation (coords, url, username) {
    return (
      {
        latitude: coords.latitude,
        longitude: coords.longitude,
        view: <Image source={{uri: url, width: 35, height: 35}} />,
        title: username,
        rightCalloutView: (
          <TouchableOpacity
            onPress={() => {
              alert('View image')
            }}>
            <Image
              style={{width: 30, height: 30}}
              source={require('../../../images/added_me.png')}
            />
          </TouchableOpacity>
        )
      }
    )
  }

  onRegionChange (region) {
    this.setState({ region })
  }

  render () {
    console.log(this.state)
    const annotations = Object.keys(this.state.markers).map((key) => {
      let marker = this.state.markers[key]
      return this.createAnnotation(
        {latitude: marker.story.storyInfo.coords.latitude, longitude: marker.story.storyInfo.coords.longitude},
        marker.story.url, marker.username
      )
    })
    return (
      <MapView
        style={styles.container}
        followUserLocation
        showsUserLocation
        annotations={annotations}
  />
    )
  }
}

MapContainer.propTypes = {

}

export default MapContainer
