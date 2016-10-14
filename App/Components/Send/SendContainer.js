import React, {Component, PropTypes} from 'react'
import {View, Text, ListView} from 'react-native'
import SendToFriends from './SendToFriends'
import SendRow, {seperatorFriends} from './SendRow'
import database, {authentication} from '../FireBase/FireBase'

class SendContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      friendsDataSource: friendsDataSource.cloneWithRows([]),
      friends: []
    }

    this.selectFriend = this.selectFriend.bind(this)
    this.pressBack = this.pressBack.bind(this)
  }

  componentDidMount () {
    this.retrieveFriends()
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

  // Retrieves a list of friends from the fire base depending on the logged in UserID
  retrieveFriends () {
    // Retrieve UserID and create a reference point in fire base
    var friends = []
    var appScope = this      // Can't use 'this.state' inside on() as the scope refers to the promise
    var userId = authentication.currentUser.uid
    var friendsRef = database.ref('userObjects/friends/' + userId + '/list')
    // Iterate through results and push to array
    friendsRef.on('value', function (snapshot) {
      snapshot.forEach((child) => {
        friends.push({
          name: child.val().firstname + ' ' + child.val().lastname,
          username: child.val().username,
          birthday: child.val().birthday,
          highlight: child.val().highlighted
        })
      })
      // Update state so ListView reflects the users friends
      // Note: Must occur inside on() as it is asynchronous and wont update properly outside
      appScope.setState({
        friendsDataSource: friendsDataSource.cloneWithRows(friends),
        friends: friends
      })
    }, function (errorObject) {
      console.log('The read failed: ' + errorObject.code)
    })
  }



  pressBack () {
    this.props.navigator.pop()
  }

  render () {
    return (
      <SendToFriends
        friends={this.state.friendsDataSource}
        onSelectFriend={this.selectFriend}
        renderSendUserRow={SendRow}
        seperatorFriends={seperatorFriends}
        selectedFriends={findSelectedFriends(this.state.friends)}
        onBackPress={this.pressBack}
      />
    )
  }
}

function findSelectedFriends (friends) {
  if (friends != null) {
    return friends.map((e) => {
      if (e.highLighted) {
        return e
      }
    }).filter(n => n !== undefined)
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
