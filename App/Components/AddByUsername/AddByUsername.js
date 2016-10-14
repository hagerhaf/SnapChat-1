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
   loading
 }) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <TouchableHighlight onPress={backButtonPressed}
                          underlayColor='#F5F5F5' >

        <Image source={require('../../../images/back_arrow.png')}
               style={styles.backArrow} />

      </TouchableHighlight>
      <Text style={styles.headerTitle}>
          Add Username
      </Text>
    </View>

    <View style={styles.searchBox}>
      <Image source={require('../../../images/search.png')}
             style={styles.searchIcon} />
      <TextInput style={styles.searchBar}
                 onChangeText={searchUsername}
                 onSubmitEditing={submitRequest}
                 placeholder='Search' />
    </View>
    {loading && <ActivityIndicator animating
                                    size='large'
                                    style={{'marginTop': 10}} />}

    {friendObject && friendCard(friendObject, addFriendPressed, addFriendLoading)}
  </View>
)

function friendCard (friendObject, addFriendPressed, addFriendLoading) {
  const friend = friendObject[Object.keys(friendObject)[0]]
  const friendId = Object.keys(friendObject)[0]

  if (addFriendLoading) {
    return (
      <View style={styles.addFriendContainer}>
        <ActivityIndicator animating size='large' style={{'padding': 30}} />
      </View>
    )
  }
  return (
    <View style={styles.addFriendContainer}>
      <View style={styles.addFriendDetails}>
        <Image style={styles.backArrow} source={require('../../../images/friend_icon.png')} />
        <Text style={styles.addFriendText}>
          {friend.firstname}
        </Text>
        <Text style={styles.addFriendText}>
          {friend.lastname}
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
