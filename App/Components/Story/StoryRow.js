import React from 'react'
import {TouchableHighlight, Text, View, Image} from 'react-native'
import {storyStyles as styles} from './StoryStyles'

const StoryRow = ({username, postedTime, url}) => {
  return (
    <TouchableHighlight>
      <View style={styles.storyRow}>
        <View style={styles.storyIcon}>
          <Image
            style={{width: 30, height: 30, borderRadius: 4}}
            source={{uri: url}}
        />
        </View>

        <View>
          <Text style={styles.usernameHeading}>{username}</Text>
          <Text style={styles.agoSubHeading}>{postedTime} ago</Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}

export default StoryRow
