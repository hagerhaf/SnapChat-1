import React, { Component, PropTypes } from 'react'
import {View, Text, ListView} from 'react-native'
import MyFriends from './MyFriends'
import FriendRow, {seperatorFriends} from './FriendRow'
import {filter} from 'lodash'

class MyFriendsContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      friendsDataSource: friendsDataSource.cloneWithRows([]),
      friends: friends,
      searchText: ""
    }

    this.selectFriend = this.selectFriend.bind(this)
    this.backButtonPressed = this.backButtonPressed.bind(this)
    this.setSearchText = this.setSearchText.bind(this)
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

  setSearchText(event) {
    let searchText = event.nativeEvent.text;
    this.setState({searchText});

    let filteredData = this.filterFriends(searchText, this.state.friendsDataSource);
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

    // ---- NEED TO CHANGE ----
    var data = friends._dataBlob.s1;

    return filter(data, (f) => {
        let friend = f.name.toLowerCase();
        return friend.search(text) !== -1;
    });
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
        name: 'bricky',
        highLighted: false
    },
    {
        name: 'joshgrover',
        highLighted: false
    },
    {
        name: 'tomdeery',
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

var sortedFriends = friends.sort((a,b) => {
    return a.name.localeCompare(b.name);
})