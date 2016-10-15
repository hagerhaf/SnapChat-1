import React, {Component} from 'react'
import Story from './Story'
import DiscoverContainer from '../Discover/DiscoverContainer'
import { ListView } from 'react-native'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import getUsers, {getStory} from './StoryHelpers'

class StoriesContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      stories: [],
      friends: []
    }
  }

  componentWillMount () {
    getUsers(function (user) {
      getStory(user, function (err, story) {
        console.log(story)
      })
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
        <Story stories={storyDataSource.cloneWithRows(stories)} tabLabel="Stories" />
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

// / mock data
var storyDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
var stories = [
  {
    username: 'nathan',
    posted: '38m'
  },
  {
    username: 'obama',
    posted: '38m'
  },
  {
    username: 'jesus',
    posted: '38m'
  },
  {
    username: 'will smith',
    posted: '38m'
  },
  {
    username: 'beibeir',
    posted: '38m'
  },
  {
    username: 'sidechick_01',
    posted: '38m'
  },
  {
    username: 'lachlan',
    posted: '38m'
  },
  {
    username: 'ryan',
    posted: '38m'
  }

]
