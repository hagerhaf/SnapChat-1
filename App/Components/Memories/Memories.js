import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import { memoriesStyles as styles } from './memoriesStyles'
import CameraRollContainer from './CameraRollContainer'

const Memories = ({ navigator }) => (
  <View style={styles.container}>
    <View style={{height: 30, marginBottom: 15}}>
      <Text style={styles.title}>Memories</Text>
    </View>
    <CameraRollContainer navigator={navigator} tabLabel={'Camera Roll'} />
  </View>
)

Memories.propTypes = {
  navigator: PropTypes.object.isRequired
}

export default Memories
