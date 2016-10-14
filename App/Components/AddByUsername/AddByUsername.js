import React, { PropTypes } from 'react'
import { View, Text, TouchableHighlight, TextInput, Image, ListView } from 'react-native'
import { AddByUsernameStyles as styles } from './AddByUsernameStyles'

const AddByUsername = ({backButtonPressed, searchUsername}) => (
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
            onChange={searchUsername}
            placeholder='Search'
          />
      </View>
  </View>
)

const func = PropTypes.func.isRequired

AddByUsername.propTypes = {
  backButtonPressed: func,
  searchUsername: func
}

export default AddByUsername
