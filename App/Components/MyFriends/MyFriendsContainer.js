import React, { Component, PropTypes } from 'react'
import {View, Text, ListView} from 'react-native'
import MyFriends from './MyFriends'
import FriendRow, {seperatorFriends} from './FriendRow'
import {} from './myFriendsUtils'
import {filter} from 'lodash'
import database, {authentication} from '../FireBase/FireBase'


class MyFriendsContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      friendsDataSource: friendsDataSource.cloneWithRows([]),
      friends: friends,
      searchText: "",
      rawData: sortedFriends
    }

    this.selectFriend = this.selectFriend.bind(this)
    this.backButtonPressed = this.backButtonPressed.bind(this)
    this.setSearchText = this.setSearchText.bind(this)
    this.retrieveFriends = this.retrieveFriends.bind(this)
    this.sortFriends = this.sortFriends.bind(this)
  }

  // Function called when component is first loaded
  // Will call function to retrieve friends from fire base then load into friendsDataSource
  componentDidMount () {

    this.retrieveFriends();
    console.log(this.sortFriends(friends));
  }

  // Retrieves a list of friends from the fire base depending on the logged in UserID
  retrieveFriends () {
      // Retrieve UserID and create a reference point in fire base
      var friends = [];
      var appScope = this;      // Can't use 'this.state' inside on() as the scope refers to the promise
      var userId = authentication.currentUser.uid;
      var friendsRef = database.ref("userObjects/friends/" + userId + "/list");
      // Iterate through results and push to array
      friendsRef.on("value", function(snapshot) {
          snapshot.forEach((child) => {
              friends.push({
                  firstname: child.val().firstname,
                  lastname: child.val().lastname,
                  username: child.val().username,
                  birthday: child.val().birthday
              });
          });
          // Update state so ListView reflects the users friends
          // Note: Must occur inside on() as it is asynchronous and wont update properly outside
          appScope.setState({
              friendsDataSource: friendsDataSource.cloneWithRows(friends)
          });
      }, function(errorObject) {
          console.log("The read failed: " + errorObject.code);
      });
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

    // MyFriends.fetch(friends, {
    //     context: this,
    //         asArray: true,
    //         then(data){
    //         let filteredData = this.filterFriends(searchText, data);
    //         this.setState({
    //             friendsDataSource: friendsDataSource.cloneWithRows(filteredData),
    //             rawData: data,
    //         });
    //     }
    // });
  }

  filterFriends(searchText, friends) {
    let text = searchText.toLowerCase();

    return filter(friends, (f) => {
        let friend = f.name.toLowerCase();
        return friend.search(text) !== -1;
    });
  }

  sortFriends(friends) {
      var sorted = friends.sort((a,b) => {
          return a.name.localeCompare(b.name);
      });
      return sorted;
  }


  // Will be called when the friend is clicked. Need to display change to display individual user popup
  selectFriend (rowId) {

  }

  render () {
    return (
        <MyFriends
            backButtonPressed={this.backButtonPressed}
            friends={this.state.friendsDataSource}
            onSelectFriend={this.selectFriend}
            renderMyFriendsRow={FriendRow}
            seperatorFriends={seperatorFriends}
            setSearchText={this.setSearchText}
        />
    )
  }
}

export default MyFriendsContainer

// Will change to retrieve firebase info when we discover how
const mockAPICall = (cb) => {
    setTimeout(() => cb(null, sortedFriends), 300)
}

var friendsDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

const friends = [
    {"name": "ryan"},
    {"name": "tom"},
    {"name": "adam"}
]

var sortedFriends = friends.sort((a,b) => {
    return a.name.localeCompare(b.name);
})

