import React, { PropTypes } from 'react'
import { View, Text, TouchableHighlight, TextInput, Image, ActivityIndicator } from 'react-native'
import { AddByUsernameStyles as styles } from './AddByUsernameStyles'

 const AddByUsername = ({
   backButtonPressed,
   searchUsername,
   submitRequest,
   friendObject,
   addFriendPressed,
   addFriendLoading,
   addSuccess,
   loading
 }) => (
  <View style={styles.container}>

    <View style={styles.header}>
      <TouchableHighlight underlayColor='#F5F5F5'
                          onPress={backButtonPressed}>

        <Image style={styles.backArrow}
               source={require('../../../images/back_arrow.png')} />

      </TouchableHighlight>
      <Text style={styles.headerTitle}>
        Add Username
      </Text>
    </View>

    <View style={styles.searchBox}>
      <Image style={styles.searchIcon}
             source={require('../../../images/search.png')} />

      <TextInput style={styles.searchBar}
                 placeholder='Search'
                 onChangeText={searchUsername}
                 onSubmitEditing={submitRequest} />
    </View>

    {loading && <ActivityIndicator animating
                                    size='large'
                                    style={{'marginTop': 10}} />}

    {friendObject && friendCard(friendObject, addFriendPressed, addFriendLoading, addSuccess)}

  </View>
)
// add friend succeeded
function friendCard (friendObject, addFriendPressed, addFriendLoading, addSuccess) {
  const friend = friendObject[Object.keys(friendObject)[0]]
  const friendId = Object.keys(friendObject)[0]

  if (addFriendLoading) {
    return (
      <View style={styles.addFriendContainer}>
        <ActivityIndicator animating size='large' style={{'padding': 30}} />
      </View>
    )
  }
  if (addSuccess) {
    return (
      <View style={styles.addFriendContainer}>
        <View style={styles.addFriendDetails}>
          <Image style={styles.backArrow} source={require('../../../images/friend_icon.png')} />
          <Text style={styles.addFriendText}>
            {friend.firstname} {friend.lastname} added to your friends!
          </Text>
        </View>
      </View>
    )
  }
  return (
    <View style={styles.addFriendContainer}>
      <View style={styles.addFriendDetails}>
        <Image style={styles.backArrow} source={require('../../../images/friend_icon.png')} />
        <Text style={styles.addFriendText}>
          {friend.firstname} {friend.lastname}
        </Text>
      </View>
      <TouchableHighlight style={styles.addFriendButtonContainer} onPress={addFriendPressed.bind(null, friend, friendId)}>
        <Text style={styles.addFriendButton}>
          Add Friend
        </Text>
      </TouchableHighlight>
    </View>
  )
}

const func = PropTypes.func.isRequired
AddByUsername.propTypes = {
  backButtonPressed: func,
  searchUsername: func
}

export default AddByUsername
