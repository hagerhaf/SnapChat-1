import React, { PropTypes } from 'react'
import { View, Text, TouchableHighlight, Image, ScrollView } from 'react-native'
import { addFriendsStyles as styles } from './addFriendsStyles'

const AddFriends = ({backButtonPressed, addByUsernamePressed, addByAddressBookPressed}) => (
  <View style={styles.container}>
    {/* Header */}
    <View style={styles.header}>
      <TouchableHighlight onPress={backButtonPressed} underlayColor='#F5F5F5'>
        <Image style={styles.backArrow} source={require('../../../images/back_arrow.png')} />
      </TouchableHighlight>
      <Text style={styles.headerTitle}>
        Add Friends
      </Text>
      <Text style={styles.backArrow} />
    </View>
    <ScrollView>
      <Row field='Add by Username' action={addByUsernamePressed} />
      <Row field='Add from Address Book' action={addByAddressBookPressed} />
      <Row field='Add by Snapcode'action={addByUsernamePressed} />
      <Row field='Add Nearby' action={addByUsernamePressed} />
      <Row field='Share username' action={addByUsernamePressed} />
    </ScrollView>
  </View>
)

const Row = ({field, action}) => {
  return (
      <TouchableHighlight onPress={action} underlayColor='#F5F5F5'>
        <View style={styles.fieldInfo}>
          <Text style={styles.fieldTitle}>
            {field}
          </Text>
          <Image style={styles.addedMeImg} source={require('../../../images/forward_arrow.png')} />
        </View>
      </TouchableHighlight>
  )
}

const func = PropTypes.func.isRequired

AddFriends.propTypes = {
  backButtonPressed: func
}

export default AddFriends
