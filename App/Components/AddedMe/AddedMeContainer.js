import React, { Component } from 'react'
import {View, Text, ListView, AsyncStorage} from 'react-native'
import FriendRow, {seperatorFriends} from './FriendRow'
import AddedMe from './AddedMe'
import database, {authentication} from '../FireBase/FireBase'

class AddedMeContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      friendsDataSource: friendsDataSource.cloneWithRows([]),
      friends: [],
      searchText: "",
      remoteUsers: null
    }

    this.backButtonPressed = this.backButtonPressed.bind(this)
  }

  componentDidMount () {
    var userId = authentication.currentUser.uid;

    // Query fire base for all users.
    var appScope = this;
    var remoteUsers = [];
    database.ref('users').once('value', function (snapshot) {
      var pairs = snapshot.val();
      // Update with relevant information.
      for (var key in pairs) {
        var val = pairs[key];
        val['id'] = key;
        val['added'] = false;
        val['name'] = val.firstname + ' ' + val.lastname;
        remoteUsers.push(val)
      }

      // Get all users who have friends, check if they added current user.
      var addedMeIds = [];
      database.ref('userObjects/friends').once('value', function (snapshot) {
        var pairs = snapshot.val();
        for (var i in pairs) {
          for (var j in pairs[i].list) {
            if (j == userId) {
              addedMeIds.push(i);
            }
          }
        }

        // Get all the users who added the current user.
        var toDisplay = [];
        for (var i = 0; i < remoteUsers.length; i++) {
          var remoteUser = remoteUsers[i];
          if (addedMeIds.includes(remoteUser.id)) {
            toDisplay.push(remoteUser);
          }
        }

        // Get users current friends.
        var currFriends = [];
        var friendsRef = database.ref('userObjects/friends/' + userId + '/list')
        friendsRef.on('value', function (snapshot) {
          for (var id in snapshot.val()) {
            currFriends.push(snapshot.val()[id].username);
          }

          // Update to show add / added.
          for (var i = 0; i < toDisplay.length; i++) {
            var c = toDisplay[i];
            if (currFriends.includes(c.username)) {
              toDisplay[i].added = true;
            }
          }

        // Update ListView.
        appScope.setState({
          friendsDataSource: friendsDataSource.cloneWithRows(toDisplay),
          friends: toDisplay,
          remoteUsers: remoteUsers
        })

        }, function (errorObject) {
          console.log('The read failed: ' + errorObject.code)
        });
      }, function (errorObject) {
        console.log('The read failed: ' + errorObject.code)
      });
    }, function (errorObject) {
      console.log('The read failed: ' + errorObject.code)
    });
  }

  backButtonPressed () {
    this.props.navigator.pop()
  }

  async addFriend (username) {

    // Get user object.
    database.ref('users')
        .orderByChild('username')
        .equalTo(username)
        .once('value', (snapshot) => {
          var friendId;
          var friend;
          for (var i in snapshot.val()) {
            friendId = i;
            friend = snapshot.val()[i];
          }

          // Create friendship in database.
          var userId = authentication.currentUser.uid;
          userId = userId.replace(/"/g, '');
          database.ref('userObjects')
              .child('friends')
              .child(userId)
              .child('list')
              .update({ [friendId]: friend }, (error) => {
                if (error) console.log('Error updating friends list', error)
              })
        });
  }

  render () {
    return <AddedMe
        friends={this.state.friendsDataSource}
        onSelectFriend={this.addFriend}
        backButtonPressed={this.backButtonPressed}
        renderMyFriendsRow={FriendRow}
        seperatorFriends={seperatorFriends}
     />
  }
}

export default AddedMeContainer

// Mock Data
const addedMeData = [
  {
    username: 'ryanokane',
    method: 'ADDED YOU BY USERNAME'
  },
  {
    username: 'nathanmalishev',
    method: 'ADDED YOU BY USERNAME'
  }
]

var friendsDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
