import React, { PropTypes } from 'react'
import { View, Text, TouchableHighlight, Image, ListView } from 'react-native'
import { addedMeStyles as styles } from './addedMeStyles'

const AddedMe = ({
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
                          underlayColor='#F5F5F5'>
        <Image style={styles.backArrow}
               source={require('../../../images/back_arrow.png')} />
      </TouchableHighlight>
      <Text style={styles.headerTitle}>
        Added me
      </Text>
      <Text style={styles.backArrow} />
    </View>
    <ListView enableEmptySections
              dataSource={friends}
              renderSeparator={seperatorFriends}
              renderRow={(data, sectionId, rowId, highlightRow) => {
                return renderMyFriendsRow(data, sectionId, rowId, highlightRow, onSelectFriend)
              }} />
  </View>
)

const func = PropTypes.func.isRequired

AddedMe.propTypes = {
    friends: PropTypes.object,
    backButtonPressed: func,
    renderMyFriendsRow: func,
    onSelectFriend: func,
    seperatorFriends: func
}

export default AddedMe
