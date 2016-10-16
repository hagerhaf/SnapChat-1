import React, { PropTypes } from 'react'
import { Text, View, ListView, Image, ActivityIndicator } from 'react-native'
import { storyStyles as styles } from './StoryStyles'
import StoryRow from './StoryRow'
import timediff from 'timediff'

const Stories = ({stories, onPressStory, storiesLoading}) => {
  var dataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  })
  const newStories = dataSource.cloneWithRows(stories)

  const createStoryRow = ({username, stories}, sectionId, rowId) => {
    if (stories) {
      let timeString = createTime(timediff(stories[0].storyInfo.date, new Date(), 'YDHmS'))
      return (
        <StoryRow
          username={username}
          postedTime={timeString}
          url={stories[0].url}
          stories={stories}
          key={`${sectionId}-${rowId}`}
          onPressStory={onPressStory}
        />
      )
    }
    return <View />
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading} />
      <Text style={styles.subheading}>
        RECENT UPDATES
      </Text>
      {
        storiesLoading
          ? <ActivityIndicator animating size='large' style={{marginTop: 20}} />
          : <ListView enableEmptySections
                      dataSource={newStories}
                      renderRow={createStoryRow} />
      }
    </View>
  )
}

Stories.propTypes = {
  stories: PropTypes.array.isRequired,
  onPressStory: PropTypes.func.isRequired
}

export default Stories

function createTime (timeDiffObject) {
  let output = ''
  if (timeDiffObject.years !== 0) return timeDiffObject.years + 'y'
  if (timeDiffObject.days !== 0) return timeDiffObject.days + 'd'
  if (timeDiffObject.hours !== 0) return timeDiffObject.hours + 'h'
  if (timeDiffObject.minutes !== 0) return timeDiffObject.minutes + 'm'

  if (output === '') {
    output += timeDiffObject.seconds + 's'
  }

  return output
}
