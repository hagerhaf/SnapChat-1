import React, { Component, PropTypes } from 'react'
import {View, Text, ListView, AsyncStorage} from 'react-native'
import AddByAddressBook from './AddByAddressBook'
import FriendRow, { seperatorFriends } from './FriendRow'
import { filter } from 'lodash'
import database, { authentication } from '../FireBase/FireBase'
var Contacts = require('react-native-contacts');

class AddByAddressBookContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
        friendsDataSource: friendsDataSource.cloneWithRows([]),
        friends: null,
        searchText: "",
        rawData: null
    }

    this.addFriend = this.addFriend.bind(this)
    this.setSearchText = this.setSearchText.bind(this)
    this.backButtonPressed = this.backButtonPressed.bind(this)
  }

  componentDidMount () {
    Contacts.getAll((err, contacts) => {
      if (err && err.type === 'permissionDenied') {
          // x.x
      } else {
          // Pull numbers from contact list.
          var localNumbers = [];
          for (var i=0; i < contacts.length; i++) {
              var numbers = contacts[i].phoneNumbers;
              for (var j = 0; j < numbers.length; j++) {
                  // Strip spaces, brackets, etc.
                  if (numbers[j]) {
                      localNumbers.push(numbers[j].number.replace(/[^0-9]/gi, ''));
                  }
              }
          }

          // Query fire base for all users.
          var appScope = this;
          var remoteUsers = [];
          database.ref('users').once('value', function (snapshot) {
              var pairs = snapshot.val();
              // Store ID with user object.
              for (var key in pairs) {
                  var val = pairs[key];
                  val['id'] = key;
                  remoteUsers.push(val)
              }

              // Query fire base for current users friends.
              var currFriends = [];
              var userId = authentication.currentUser.uid;
              var friendsRef = database.ref('userObjects/friends/' + userId + '/list')
              friendsRef.on('value', function (snapshot) {
                  snapshot.forEach((child) => {
                      // Store username of each current friend.
                      currFriends.push(
                          child.val().username
                      )
                  });

                  // Find users who have app, check if already friends.
                  var toDisplay = [];
                  for (var i = 0; i < remoteUsers.length; i++) {
                      var remoteUser = remoteUsers[i];
                      var number = remoteUser.phoneNumber;

                      // If user is a contact, display them.
                      if (localNumbers.includes(number)) {
                          toDisplay.push({
                              name: remoteUser.firstname + ' ' + remoteUser.lastname,
                              username: remoteUser.username,
                              added: currFriends.includes(remoteUser.username) // Check if already friend.
                          })
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
          })
      }
    })
  }

  backButtonPressed () {
      this.props.navigator.pop()
  }

  setSearchText(event) {
      let searchText = event.nativeEvent.text;
      this.setState({searchText});

      let filteredData = this.filterFriends(searchText, this.state.rawData);
      this.setState({
          friendsDataSource: friendsDataSource.cloneWithRows(filteredData)
      });
  }

  filterFriends(searchText, friends) {
      let text = searchText.toLowerCase();

      return filter(friends, (f) => {
          let friend = f.name.toLowerCase();
          return friend.search(text) !== -1;
      });
  }

  async addFriend (rowId) {
      var username = this.state.friends[rowId].username;
      // Get friend object through username.
      var friend;
      for (var i = 0; i < this.state.remoteUsers.length; i++) {
          var curr = this.state.remoteUsers[i];
          if (curr.username == username) {
              friend = curr;
              break;
          }
      }
      // Extract and remove ID.
      console.log(friend);
      var friendId = friend.id;
      delete friend.id;
      try {
        let userId = await AsyncStorage.getItem('userId')
        userId = userId.replace(/"/g, '')
        database.ref('userObjects')
            .child('friends')
            .child(userId)
            .child('list')
            .update({ [friendId]: friend }, (error) => {
                if (error) console.log('Error updating friends list', error);

                // Update list to include that this friends has been added.
                var newFriends = [];
                for (var i = 0; i < this.state.friends.length; i++) {
                    var oldFriend = this.state.friends[i];
                    var newFriend = {
                        name: oldFriend.name,
                        username: oldFriend.username,
                        added: this.state.friends[i].username || this.state.friends[i].username === username
                    };
                    newFriends.push(newFriend)
                }

                this.setState({
                    friends: newFriends,
                    friendsDataSource: friendsDataSource.cloneWithRows(newFriends),
                })
            })
      } catch (error) {
          console.log('Error retreiving user Id', error)
      }
  }

  render () {
    return (
      <AddByAddressBook friends={this.state.friendsDataSource}
                        onSelectFriend={this.addFriend}
                        setSearchText={this.setSearchText}
                        backButtonPressed={this.backButtonPressed}
                        renderMyFriendsRow={FriendRow}
                        seperatorFriends={seperatorFriends} />
    )
  }
}

export default AddByAddressBookContainer

var friendsDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
