import React, { PropTypes } from 'react'
import { View, ScrollView } from 'react-native'
import { discoverStyles as styles } from './discoverStyles'
import DiscoverItem from './DiscoverItem'

const Discover = ({ children, discoverData }) => {
  console.log(discoverData)
  return (
    <View style={styles.container}>
      {children}
      <View style={styles.discoverItems}>
        <ScrollView
          showsVerticalScrollIndicator
          automaticallyAdjustContentInsets={false}
          horizontal={false}
        >
          {discoverData.map(createThumbRow)}
        </ScrollView>
      </View>
    </View>
  )
}

const createThumbRow = (item, i) => (
  <DiscoverItem
    key={i}
    title={item.title}
    author={item.author}
    image={item.urlToImage}
  />
)

Discover.propTypes = {
  children: PropTypes.object,
  discoverData: PropTypes.array.isRequired
}

export default Discover
