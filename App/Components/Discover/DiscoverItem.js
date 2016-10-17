import React, { PropTypes } from 'react'
import { View, Text, Image, TouchableHighlight } from 'react-native'
import { discoverStyles as styles } from './discoverStyles'

const DiscoverItem = ({ title, image, open, url }) => (
  <TouchableHighlight onPress={open.bind(null, url)}>
    <View style={styles.discoverItem} >
      <Text style={styles.itemTitle}>
        {title}
      </Text>
      <Image style={styles.itemImage}
              source={{uri: image}} />
    </View>
  </TouchableHighlight>
)

DiscoverItem.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
}

export default DiscoverItem
