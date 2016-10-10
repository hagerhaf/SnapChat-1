import React, { Component, PropTypes } from 'react'
import {View, Text, ListView} from 'react-native'
import MyFriends from './MyFriends'
import FriendRow, {seperatorFriends} from './FriendRow'

class MyFriendsContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      friendsDataSource: friendsDataSource.cloneWithRows([]),
      friends: friends
    }

    this.selectFriend = this.selectFriend.bind(this)
    this.backButtonPressed = this.backButtonPressed.bind(this)
  }

  componentDidMount () {
    mockAPICall((err, res) => {
        if (err) console.log(err)
        else {
            this.setState({
                friendsDataSource: friendsDataSource.cloneWithRows(res)
            })
        }
    })
  }

  backButtonPressed () {
    this.props.navigator.pop()
  }

  // Will be called when the friend is clicked. Need to display change to display individual user popup
  selectFriend (rowId) {
    var newFriends = []
    newFriends = this.state.friends.slice()
    newFriends[rowId] = {
        name: newFriends[rowId].name,
        highLighted: !newFriends[rowId].highLighted
    }
    console.log(this.state.friends)
    this.setState({
        friends: newFriends,
        friendsDataSource: this.state.friendsDataSource.cloneWithRows(newFriends)
    })
  }

  render () {
    return (
        <MyFriends
            backButtonPressed={this.backButtonPressed}
            friends={this.state.friendsDataSource}
            onSelectFriend={this.selectFriend}
            renderMyFriendsRow={FriendRow}
            seperatorFriends={seperatorFriends}
        />
    )
  }
}

export default MyFriendsContainer

// Will change to retrieve firebase info when we discover how
const mockAPICall = (cb) => {
    setTimeout(() => cb(null, friends), 300)
}

var friendsDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

// Mock Data
const friends = [
    {
        name: 'lachlan',
        highLighted: false
    },
    {
        name: 'ryan',
        highLighted: false
    },
    {
        name: 'nathan',
        highLighted: false
    },
    {
        name: 'tim',
        highLighted: false
    },
    {
        name: 'remdogga',
        highLighted: false
    },
    {
        name: 'hot_chick_69',
        highLighted: false
    },
    {
        name: 'side_chick_01',
        highLighted: false
    },
    {
        name: 'side_chick_02',
        highLighted: false
    },
    {
        name: 'obama',
        highLighted: false
    },
    {
        name: 'lachlan',
        highLighted: false
    },
    {
        name: 'ryan',
        highLighted: false
    },
    {
        name: 'nathan',
        highLighted: false
    },
    {
        name: 'tim',
        highLighted: false
    },
    {
        name: 'remdogga',
        highLighted: false
    },
    {
        name: 'hot_chick_69',
        highLighted: false
    },
    {
        name: 'side_chick_01',
        highLighted: false
    },
    {
        name: 'side_chick_02',
        highLighted: false
    },
    {
        name: 'obama',
        highLighted: false
    }
]