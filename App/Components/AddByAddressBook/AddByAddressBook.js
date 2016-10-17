import React, { PropTypes } from 'react'
import { View, Text, TouchableHighlight, TextInput, Image, ListView } from 'react-native'
import { AddByAddressBookStyles as styles } from './AddByAddressBookStyles'

const AddByAddressBook = ({
  backButtonPressed,
  friends,
  renderMyFriendsRow,
  onSelectFriend,
  seperatorFriends,
  setSearchText
}) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <TouchableHighlight onPress={backButtonPressed}
                          underlayColor='#F5F5F5' >

          <Image source={require('../../../images/back_arrow.png')}
                  style={styles.backArrow} />

      </TouchableHighlight>
      <Text style={styles.headerTitle}>
          Address Book
      </Text>
      <Text style={styles.backArrow} />
    </View>
    <View style={styles.searchBox}>
      <Image source={require('../../../images/search.png')}
             style={styles.searchIcon} />

      <TextInput style={styles.searchBar}
                 onChange={setSearchText}
                 placeholder='Search' />
    </View>
    <Text style={styles.subHeading}>
      SNAPCHATTERS IN YOUR CONTACTS
    </Text>
    <ListView enableEmptySections
              dataSource={friends}
              renderSeparator={seperatorFriends}
              renderRow={(data, sectionId, rowId, highlightRow) => {
                return renderMyFriendsRow(data, sectionId, rowId, highlightRow, onSelectFriend)
              }} />
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
