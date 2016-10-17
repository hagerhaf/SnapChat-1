import React, { Component } from 'react'
import { MapView, Image, TouchableOpacity} from 'react-native'
import { mapStyles as styles } from './MapStyles'
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
    this.createMarkers(this.props.stories)
  }

  componentWillReceiveProps (nextProps) {
    this.createMarkers(nextProps.stories)
  }

  createMarkers (friendsList) {
    let newMarkers = deepcopy(this.state.markers)

    friendsList.map((friend) => {
      if (friend.stories) {
        // create an entry for each story
        friend.stories.forEach((story) => {
          if (story.storyInfo.coords) {
            newMarkers[story.storyInfo.imageName] = {story, username: friend.username, key: friend.key}
          }
        })
      }
    })
    this.setState({
      markers: newMarkers
    })
  }

  createAnnotation (coords, url, username, storyObject) {
    return (
      {
        latitude: coords.latitude,
        longitude: coords.longitude,
        view: <Image source={{uri: url, width: 35, height: 35}} />,
        title: username,
        rightCalloutView: (
          <TouchableOpacity
            onPress={() => {
              this.props.onPressStory([storyObject.story])
            }}>
            <Image
              style={{width: 30, height: 30, borderRadius: 12}}
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
    const annotations = Object.keys(this.state.markers).map((key) => {
      console.log('for images' + key)
      let marker = this.state.markers[key]
      return this.createAnnotation(
        {latitude: marker.story.storyInfo.coords.latitude, longitude: marker.story.storyInfo.coords.longitude},
        marker.story.url, marker.username, this.state.markers[key]
      )
    })
    return (
      <MapView style={styles.container}
               followUserLocation
               showsUserLocation
               annotations={annotations} />
    )
  }
}

export default MapContainer
