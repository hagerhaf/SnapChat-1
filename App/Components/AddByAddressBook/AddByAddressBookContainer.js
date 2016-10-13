import React, { Component, PropTypes } from 'react'
import {View, Text, ListView} from 'react-native'
import AddByAddressBook from './AddByAddressBook'
import FriendRow, {seperatorFriends} from './FriendRow'
import {filter} from 'lodash'

// Cant get to work atm
import AddressBook from 'react-native-contacts'

class AddByAddressBookContainer extends Component {

    constructor (props) {
        super(props)

        this.state = {
            friendsDataSource: friendsDataSource.cloneWithRows([]),
            friends: friends,
            searchText: "",
            rawData: sortedFriends
        }

        this.addFriend = this.addFriend.bind(this)
        this.setSearchText = this.setSearchText.bind(this)
        this.backButtonPressed = this.backButtonPressed.bind(this)
    }

    // This will contain the call to the database to return a list of users
    // a list of phone numbers which are contained in the phone will be sent as input
    // and the matching users will be returned as a list.
    // friendsDataSource will then be updated to reflect this list
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

    // Will be called when the Add button is called on a user.
    // Need to perform call to db to add a given user
    // Then remove their name from the friendsDataSource to remove row
    addFriend (rowId) {
        console.log("Adding Friend")
    }

    render () {
        return (
            <AddByAddressBook
                friends={this.state.friendsDataSource}
                onSelectFriend={this.addFriend}
                setSearchText={this.setSearchText}
                backButtonPressed={this.backButtonPressed}
                renderMyFriendsRow={FriendRow}
                seperatorFriends={seperatorFriends}
            />
        )
    }

}

export default AddByAddressBookContainer

// Will change to retrieve firebase info when we discover how
const mockAPICall = (cb) => {
    setTimeout(() => cb(null, sortedFriends), 300)
}

var friendsDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

// Mock Data
const friends = [
    {
        name: 'Lachlan Dee',
        username: 'ldee',
        highLighted: false
    },
    {
        name: 'Adam Villela',
        username: 'avillela',
        highLighted: false
    },
    {
        name: 'Ben Paul',
        username: 'bpaul',
        highLighted: false
    },
    {
        name: 'Brody Ricardi',
        username: 'bricardi',
        highLighted: false
    },
    {
        name: 'Claire Gorinas',
        username: 'cgorinas',
        highLighted: false
    },
    {
        name: 'Emily Thompson',
        username: 'ethompson',
        highLighted: false
    },
    {
        name: 'Josh Grover',
        username: 'jgrover',
        highLighted: false
    },
    {
        name: 'Jack Crisp',
        username: 'jcrisp',
        highLighted: false
    },
    {
        name: 'Harry Mitchell',
        username: 'hmitchell',
        highLighted: false
    },
    {
        name: 'Luke Wentworth',
        username: 'lwentworth',
        highLighted: false
    },
    {
        name: 'Tom Deery',
        username: 'tdeery',
        highLighted: false
    },
    {
        name: 'Kane Michelini',
        username: 'kmichelini',
        highLighted: false
    },
    {
        name: 'Georgia Castricum',
        username: 'gcastricum',
        highLighted: false
    },
    {
        name: 'Jake Musson',
        username: 'jmusson',
        highLighted: false
    },
    {
        name: 'nathan',
        username: 'nmalishev',
        highLighted: false
    },
    {
        name: 'Anthony LaSpina',
        username: 'alaspina',
        highLighted: false
    },
    {
        name: 'tim',
        username: 'timmyboy',
        highLighted: false
    },
    {
        name: 'remdogga',
        username: 'remdogg',
        highLighted: false
    },
    {
        name: 'Nick Howell',
        username: 'nhowell',
        highLighted: false
    },
    {
        name: 'Henry Mahoney',
        username: 'hmahoney',
        highLighted: false
    },
    {
        name: 'Talia Rinaldo',
        username: 'talia',
        highLighted: false
    },
    {
        name: 'Michael Wilson',
        username: 'wilso',
        highLighted: false
    },
    {
        name: 'Lochie Brick',
        username: 'lbrick',
        highLighted: false
    },
    {
        name: 'Rebecca Kirk',
        username: 'rkirk',
        highLighted: false
    }
]

var sortedFriends = friends.sort((a,b) => {
    return a.name.localeCompare(b.name);
})

