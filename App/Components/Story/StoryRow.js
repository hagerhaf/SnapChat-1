import React, {PropTypes} from 'react'
import {TouchableHighlight, Text, View, Image} from 'react-native'
import {storyStyles as styles} from './StoryStyles'

const StoryRow = ({username, postedTime, url, stories, onPressStory}) => {
  return (
    <TouchableHighlight onPress={() => onPressStory(stories)}>
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

StoryRow.propTypes = {
  stories: PropTypes.array.isRequired,
  onPressStory: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  postedTime: PropTypes.string.isRequired
}

export default StoryRow
