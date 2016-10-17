import React, {Component, PropTypes} from 'react'
import {View, Text, Image, TouchableWithoutFeedback} from 'react-native'
import MapView from 'react-native-maps'
import {mapStyles as styles} from './MapStyles'
import getFriends, { getStory } from '../Story/StoryHelpers'
import deepcopy from 'deepcopy'
import ViewImage from '../Image/ViewImage'

class MapContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      markers: {}
    }

    this.onRegionChange = this.onRegionChange.bind(this)
    this.pressStory = this.pressStory.bind(this)
    this.createStoryMarkers = this.createStoryMarkers.bind(this)
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

  componentWillReceiveProps (nextProps) {
    this.createStoryMarkers(nextProps.stories)
  }

  pressStory (stories) {
    this.props.navigator.push({
      component: ViewImage,
      title: 'Story time',
      passProps: {
        stories,
        navigator: this.props.navigator
      }
    })
  }

  onRegionChange (region) {
    this.setState({ region })
  }

  createStoryMarkers (friendsList) {
    friendsList.map((friend) => {
      if (friend.stories) {
        if (friend.stories[0].storyInfo.coords) {
          let newMarkers = deepcopy(this.state.markers)
          newMarkers[friend.key] = friend
          this.setState({
            markers: newMarkers
          })
        }
      }
    })
  }

  render () {
    console.log(this.state)
    console.log(this.props)
    return (
      <MapView
        style={styles.container}
        region={this.state.region}
        showsUserLocation
        onRegionChange={this.onRegionChange}
  >
        {Object.keys(this.state.markers).map((key) => <Marker key={key} region={this.state.region} stories={this.state.markers[key]} />)}
      </MapView>
    )
  }
}

MapContainer.propTypes = {

}

export default MapContainer

const Marker = ({region, stories}) => {
  console.log('stories', stories)
  return (<MapView.Marker
    coordinate={{latitude: region.latitude,
        longitude: region.longitude}}
    title={'username here'}
    centerOffset={{ x: -18, y: -60 }}
    anchor={{ x: 0.69, y: 1 }}
    onPress={() => console.log('change')}
>
    <Image source={{uri: stories.stories[0].url}} style={{width: 20, height: 20}} />

  </MapView.Marker>
  )
}
