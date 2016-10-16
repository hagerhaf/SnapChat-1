import React, { Component } from 'react'
import { ListView } from 'react-native'
import MyFriends from './MyFriends'
import FriendRow, { seperatorFriends } from './FriendRow'
import {} from './myFriendsUtils'
import { filter } from 'lodash'
import database, { authentication } from '../FireBase/FireBase'

class MyFriendsContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      friendsDataSource: friendsDataSource.cloneWithRows([]),
      searchText: '',
      rawData: []
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
    this.retrieveFriends()
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
          firstname: child.val().firstname,
          lastname: child.val().lastname,
          username: child.val().username,
          birthday: child.val().birthday
        })
      })
          // Update state so ListView reflects the users friends
          // Note: Must occur inside on() as it is asynchronous and wont update properly outside
      appScope.setState({
        friendsDataSource: friendsDataSource.cloneWithRows(appScope.sortFriends(friends)),
        rawData: appScope.sortFriends(friends)
      })
    }, function (errorObject) {
      console.log('The read failed: ' + errorObject.code)
    })
  }

  backButtonPressed () {
    this.props.navigator.pop()
  }

  // Called with every key change in the search bar. Will then continue to call filter on original data
  setSearchText (event) {
    let searchText = event.nativeEvent.text
    this.setState({searchText})
    // Filter results and update state
    let filteredData = this.filterFriends(searchText, this.state.rawData)
    this.setState({
      friendsDataSource: friendsDataSource.cloneWithRows(filteredData)
    })
  }

  // Called by setSearchText. Filters original data and returns result
  filterFriends (searchText, friends) {
    let text = searchText.toLowerCase()

    return filter(friends, (f) => {
      let friendFirst = f.firstname.toLowerCase()
      let friendLast = f.lastname.toLowerCase()
      return ((friendFirst.search(text) !== -1) || (friendLast.search(text) !== -1))
    })
  }

  // Sorts a list of friends on their firstname
  sortFriends (friends) {
    var sorted = friends.sort((a, b) => {
      return a.firstname.localeCompare(b.name)
    })
    return sorted
  }

  // Will be called when the friend is clicked. Need to display change to display popup allowing access to
  // chat and snap pages for this user
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

var friendsDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
