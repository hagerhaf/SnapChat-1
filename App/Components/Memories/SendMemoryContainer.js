import React, {Component, PropTypes} from 'react'
import { ListView } from 'react-native'
import SendToFriends from './SendToFriends'
import SendRow, { seperatorFriends } from './SendRow'
import database, { authentication } from '../FireBase/FireBase'
import { uploadImageToMemories } from '../Send/SendHelpers'

class SendMemoryContainer extends Component {
  constructor (props) {
    super(props)

    let friendsDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      friendsDataSource: friendsDataSource.cloneWithRows([]),
      friends: [],
      isSending: false,
      hasSent: false,
      sendError: false
    }

    this.selectFriend = this.selectFriend.bind(this)
    this.pressBack = this.pressBack.bind(this)
    this.sendMemoryToChat = this.sendMemoryToChat.bind(this)
  }

  componentDidMount () {
    this.retrieveFriends()
  }

  selectFriend (rowId) {
    var newFriends = []
    newFriends = this.state.friends.slice()
    newFriends[rowId] = {
      name: newFriends[rowId].name,
      highLighted: !newFriends[rowId].highLighted,
      key: newFriends[rowId].key
    }
    this.setState({
      friends: newFriends,
      friendsDataSource: this.state.friendsDataSource.cloneWithRows(newFriends)
    })
  }

  sendMemoryToChat () {
    this.setState({ isSending: true })
    const userId = authentication.currentUser.uid
    uploadImageToMemories(this.props.imageUri, userId)
      .then((url) => {
        this.state.friends.forEach((friend) => {
          if (friend.highLighted) {
            const time = `${new Date()}`
            const message = {message: url, timestamp: time, type: 'sent', format: 'image'}
            const send = database.ref(`userObjects/messages/${friend.key}/${userId}`)
            send.push(message)
          }
        })
      })
      .then(() => {
        this.setState({
          isSending: false,
          hasSent: true
        })
        setTimeout(() => {
          this.props.navigator.popToTop()
        }, 850)
      })
  }

  retrieveFriends () {
    var friends = []
    var appScope = this
    var userId = authentication.currentUser.uid
    var friendsRef = database.ref('userObjects/friends/' + userId + '/list')
    friendsRef.on('value', function (snapshot) {
      snapshot.forEach((child) => {
        friends.push({
          name: child.val().firstname + ' ' + child.val().lastname,
          username: child.val().username,
          birthday: child.val().birthday,
          highlight: false,
          key: child.key
        })
      })
      appScope.setState({
        friendsDataSource: appScope.state.friendsDataSource.cloneWithRows(friends),
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
      <SendToFriends friends={this.state.friendsDataSource}
                     onSelectFriend={this.selectFriend}
                     renderSendUserRow={SendRow}
                     seperatorFriends={seperatorFriends}
                     selectedFriends={findSelectedFriends(this.state.friends)}
                     onBackPress={this.pressBack}
                     onSendPressed={this.sendMemoryToChat}
                     isSending={this.state.isSending}
                     hasSent={this.state.hasSent}
                     sendError={this.state.sendError} />
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

SendMemoryContainer.propTypes = {
  imageUri: PropTypes.string.isRequired,
  navigator: PropTypes.object.isRequired
}

export default SendMemoryContainer
