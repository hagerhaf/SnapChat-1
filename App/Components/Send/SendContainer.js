import React, {Component, PropTypes} from 'react'
import {View, Text, ListView} from 'react-native'
import SendToFriends from './SendToFriends'
import SendRow, {seperatorFriends} from './SendRow'

class SendContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      friendsDataSource: friendsDataSource.cloneWithRows([]),
      friends: friends
    }

    this.selectFriend = this.selectFriend.bind(this)
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
      <SendToFriends
        friends={this.state.friendsDataSource}
        onSelectFriend={this.selectFriend}
        renderSendUserRow={SendRow}
        seperatorFriends={seperatorFriends}
      />
    )
  }
}

SendContainer.propTypes = {

}

export default SendContainer

// mock data

const mockAPICall = (cb) => {
  setTimeout(() => cb(null, friends), 300)
}

var friendsDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

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
  }
]
