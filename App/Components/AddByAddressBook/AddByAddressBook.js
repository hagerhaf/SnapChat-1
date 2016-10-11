import React, { PropTypes } from 'react'
import { View, Text, TouchableHighlight, TextInput, Image, ListView } from 'react-native'
import { AddByAddressBookStyles as styles } from './AddByAddressBookStyles'

const AddByAddressBook = ({backButtonPressed, friends, renderMyFriendsRow, onSelectFriend, seperatorFriends, setSearchText}) => (

    <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
            <TouchableHighlight onPress={backButtonPressed} underlayColor='#F5F5F5'>
                <Image style={styles.backArrow} source={require('../../../images/back_arrow.png')} />
            </TouchableHighlight>
            <Text style={styles.headerTitle}>
                My Friends
            </Text>
            <Text style={styles.backArrow}></Text>
        </View>

        {/*Body*/}
        <View>
            <View style={styles.searchBox}>
                <Image style={styles.searchIcon} source={require('../../../images/search.png')} />
                <TextInput
                    style={styles.searchBar}
                    onChange={setSearchText}
                    placeholder='Search'
                />
            </View>

            <Text style={styles.subHeading}>SNAPCHATTERS IN YOUR CONTACTS</Text>

        </View>

    </View>
)


const func = PropTypes.func.isRequired

AddByAddressBook.propTypes = {
    friends: PropTypes.object,
    backButtonPressed: func,
    renderMyFriendsRow: func,
    onSelectFriend: func,
    seperatorFriends: func
}

export default AddByAddressBook