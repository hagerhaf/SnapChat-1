import React, { PropTypes } from 'react'
import { Text, View, ListView } from 'react-native'
import { storyStyles as styles } from './StoryStyles'
import StoryRow from './StoryRow'

const Stories = ({ stories }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>

      </Text>
      <Text style={styles.subheading}>
        RECENT UPDATES
      </Text>
      <ListView
        dataSource={stories}
        renderRow={createStoryRow}
      />
    </View>
  )
}

Stories.propTypes = {
  stories: PropTypes.object.isRequired
}

export default Stories

const createStoryRow = (storyObject, i) => {
  return (
    <StoryRow
      username={storyObject.username}
      postedTime={storyObject.posted}
      key={i + Math.random()}
    />
  )
}
