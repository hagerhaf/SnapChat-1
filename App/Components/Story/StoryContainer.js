import React, {Component} from 'react'
import { ListView } from 'react-native'
import Story from './Story'
import DiscoverContainer from '../Discover/DiscoverContainer'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import getFriends, { getStory } from './StoryHelpers'
import deepCopy from 'deepcopy'
import ViewImage from '../Image/ViewImage'
import Map from '../Map/MapContainer'

class StoriesContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      friendsStories: [],
      storiesLoading: true
    }

    this.pressStory = this.pressStory.bind(this)
  }

  componentDidMount () {
    getFriends((friend) => {
      let newFriends = this.state.friendsStories.slice()
      newFriends.push(friend)
      this.setState({
        friendsStories: newFriends
      })

      getStory(friend, (story) => {
        var newFriendsWStory = this.state.friendsStories.slice()
        newFriendsWStory = newFriendsWStory.map((nfriend) => {
          if (nfriend.key === friend.key) {
            if (nfriend['stories']) {
              nfriend['stories'].push(deepCopy(story))
            } else {
              nfriend['stories'] = [deepCopy(story)]
            }
          }
          return nfriend
        })
        this.setState({
          friendsStories: newFriendsWStory,
          storiesLoading: false
        })
      })
    })
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

  render () {
    return (
      <ScrollableTabView
        style={{marginTop: 30}}
        renderTabBar={renderTab}
        tabBarTextStyle={{fontFamily: 'Avenir-Heavy', fontSize: 18}}
        tabBarActiveTextColor="purple"
        tabBarInactiveTextColor="gray"
      >
        {/* Snaps container lists all your saved memories (photos you've taken) and adds to ability to resend */}
        <Story
          stories={this.state.friendsStories}
          onPressStory={this.pressStory}
          storiesLoading={this.state.storiesLoading}
          tabLabel="Stories"
        />

        <Map
          tabLabel="Where?"
          stories={this.state.friendsStories}
          onPressStory={this.pressStory}
        />

        {/* Lets you look through camera roll to send ppl snaps, upload or delete */}
        <DiscoverContainer tabLabel="Discover" />
      </ScrollableTabView>
    )
  }
}

function renderTab () {
  return <DefaultTabBar underlineColor={'purple'} underlineHeight={1.5} />
}

export default StoriesContainer

