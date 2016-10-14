import React, { PropTypes } from 'react'
import { View, Text, TouchableHighlight, TextInput, Image, ActivityIndicator } from 'react-native'
import { AddByUsernameStyles as styles } from './AddByUsernameStyles'

 const AddByUsername = ({
   backButtonPressed,
   searchUsername,
   submitRequest,
   friendObject,
   loading
 }) => (
  <View style={styles.container}>
    {/* Header */}
    <View style={styles.header}>
        <TouchableHighlight onPress={backButtonPressed} underlayColor='#F5F5F5'>
            <Image style={styles.backArrow} source={require('../../../images/back_arrow.png')} />
        </TouchableHighlight>
        <Text style={styles.headerTitle}>
            Add Username
        </Text>
        <Text style={styles.backArrow} />
    </View>

    {/* Body */}
    <View style={styles.searchBox}>
        <Image style={styles.searchIcon} source={require('../../../images/search.png')} />
        <TextInput
          style={styles.searchBar}
          onChangeText={searchUsername}
          onSubmitEditing={submitRequest}
          placeholder='Search'
        />
    </View>
    {loading && <ActivityIndicator animating size='large' style={{'marginTop': 10}} />}

    {friendObject && friendCard(friendObject)}
  </View>
)

function friendCard (friendObject) {
  return (
    <View>
      <Text>
        firstname
      </Text>
      <Text>
        lastname
      </Text>
      <View>
        <Text>
          Add Friend
        </Text>
      </View>
    </View>
  )
}

function friendNotFound () {
  return (
    <View>
      <Text>
        Friend not found
      </Text>
    </View>
  )
}

const func = PropTypes.func.isRequired
AddByUsername.propTypes = {
  backButtonPressed: func,
  searchUsername: func
}

export default AddByUsername
