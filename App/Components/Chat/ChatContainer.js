import React, { PropTypes } from 'react'
import { ListView } from 'react-native'
import ChatToUser from './ChatToUser'
import Chat from './Chat'
import deepcopy from 'deepcopy'
import database, { authentication, getSnapsCurrentUser, getDownloadUrl, deleteSnap } from '../FireBase/FireBase'
import ViewSnap from '../Image/ViewImage'

class ChatContainer extends React.Component {
  constructor (props) {
    super(props)

    const friendsDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      loading: false,
      friendsList: [],
      dataSource: friendsDataSource.cloneWithRows([])
    }

    this.openChat = this.openChat.bind(this)
    this.getFriends = this.getFriends.bind(this)
    this.backToChat = this.backToChat.bind(this)
    this.getSnaps = this.getSnaps.bind(this)
    this.openSnaps = this.openSnaps.bind(this)
  }

  componentDidMount () {
    this.getFriends()
    this.getSnaps()
  }

  getFriends () {
    this.setState({
      loading: true
    })
    // copied over from myFriendsContainer
    const friends = []
    const component = this
    const userId = authentication.currentUser.uid
    const friendsRef = database.ref('userObjects/friends/' + userId + '/list')
    friendsRef.on('value', (snapshot) => {
      if (snapshot.val() === null) return this.setState({loading: false})
      Object.keys(snapshot.val()).forEach((key) => {
        const friend = snapshot.val()[key]
        friend.uid = key
        friends.push(friend)
      })
      component.setState({
        dataSource: this.state.dataSource.cloneWithRows(friends),
        friendsList: friends,
        loading: false
      })
    }, (errorObject) => {
      console.log('The read failed: ' + errorObject.code)
    })
  }

  getSnaps () {
    getSnapsCurrentUser((snaps) => {
      const friendsDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
      if (snaps === null) {
        this.setState({
          dataSource: friendsDataSource.cloneWithRows(this.state.friendsList)
        })
        return
      }
      Object.keys(snaps).forEach((snapKey) => {
        getDownloadUrl(snaps[snapKey], (snapObject) => {
        // want to go through friends and merge snapObject
          let newFriends = deepcopy(this.state.friendsList)

          newFriends.map((friend) => {
            if (friend.uid === snapObject.fromUser) {
              if (friend.snaps) {
                friend.snaps.push(snapObject)
                return friend
              } else {
                return Object.assign(friend, {snaps: [snapObject]})
              }
            }
          })
          this.setState({
            dataSource: friendsDataSource.cloneWithRows(newFriends)
          })
        })
      })
    })
  }

  openSnaps (snaps) {
    this.props.navigator.push({
      component: ViewSnap,
      title: 'View snap',
      passProps: {
        stories: snaps
      }
    })
    /* delete snaps now */
    snaps.forEach((snap) => {
      deleteSnap(snap, (res) => {
        this.getSnaps()
      })
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
      <Chat
        friends={this.state.dataSource}
        openChat={this.openChat}
        loading={this.state.loading}
        openSnaps={this.openSnaps} />
    )
  }
}

ChatContainer.propTypes = {
  navigator: PropTypes.object.isRequired
}

export default ChatContainer
