import React, { PropTypes } from 'react'
import { ListView, View, ActivityIndicator } from 'react-native'
import ChatToUser from './ChatToUser'
import Chat from './Chat'
import database, { authentication } from '../FireBase/FireBase'

class ChatContainer extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: true,
      friendsList: [],
      dataSource: friendsDataSource.cloneWithRows([])
    }

    this.openChat = this.openChat.bind(this)
    this.getFriends = this.getFriends.bind(this)
    this.backToChat = this.backToChat.bind(this)
  }

  componentDidMount () {
    this.getFriends()
  }

  getFriends () {
    // copied over from myFriendsContainer
    const friends = []
    const appScope = this
    const userId = authentication.currentUser.uid
    const friendsRef = database.ref('userObjects/friends/' + userId + '/list')
    friendsRef.on('value', (snapshot) => {
      Object.keys(snapshot.val()).forEach((key) => {
        const friend = snapshot.val()[key]
        friend.uid = key
        friends.push(friend)
      })
      appScope.setState({
        dataSource: friendsDataSource.cloneWithRows(friends),
        friendsList: friends,
        loading: false
      })
    }, (errorObject) => {
      console.log('The read failed: ' + errorObject.code)
    })
  }

  backToChat () {
    this.props.navigator.pop()
  }

  openChat (username, uid) {
    this.props.navigator.push({
      title: 'Chat w' + username,
      component: ChatToUser,
      passProps: {
        username,
        uid,
        onBackPress: this.backToChat
      },
      sceneConfig: this.props.navigator.SceneConfigs
    })
  }

  render () {
    return (
      <Chat friends={this.state.dataSource}
            openChat={this.openChat}
            loading={this.state.loading} />
    )
  }
}

ChatContainer.propTypes = {
  navigator: PropTypes.object.isRequired
}

const friendsDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
const messagesDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

export default ChatContainer
