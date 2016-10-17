import React, {PropTypes} from 'react'
import {Image, View, Text, TouchableWithoutFeedback} from 'react-native'
import {viewStyles as styles} from './ViewStyles'

export default function ViewSnap ({url, onBackPressed, countDown}) {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onBackPressed}>
        <View style={styles.heading}>
          <Text style={styles.title}> Back </Text>
          <Text style={styles.title}> {countDown} </Text>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.content}>
        <Image style={{ height: 120, borderRadius: 4, flex: 1, alignItems: 'stretch'}} source={{uri: url}} />
      </View>
    </View>
    )
}

ViewSnap.propTypes = {
  url: PropTypes.string.isRequired,
  onBackPressed: PropTypes.func.isRequired
}

