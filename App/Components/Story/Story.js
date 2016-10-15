import React, { PropTypes } from 'react'
import { Text, View, ListView } from 'react-native'
import { storyStyles as styles } from './StoryStyles'
import StoryRow from './StoryRow'
import timediff from 'timediff'

const Stories = ({stories}) => {
  console.log('stories', stories)
  var dataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  })
  const newStories = dataSource.cloneWithRows(stories)
  return (
    <View style={styles.container}>
      <Text style={styles.heading} />
      <Text style={styles.subheading}>
        RECENT UPDATES
      </Text>
      <ListView
        enableEmptySections
        dataSource={newStories}
        renderRow={createStoryRow}
      />
    </View>
  )
}

Stories.propTypes = {
  stories: PropTypes.array.isRequired
}

export default Stories

const createStoryRow = ({username, stories}, sectionId, rowId) => {
  // time dif
  console.log(username, stories)
  if (stories) {
    let timeString = createTime(timediff(stories[0].storyInfo.date, new Date(), 'YDHms'))

    return (
      <StoryRow
        username={username}
        postedTime={timeString}
        key={`${sectionId}-${rowId}`}
    />
  )
  }
  return <View />
}

function createTime (timeDiffObject) {
  let output = ''
  output += timeDiffObject.years !== 0 ? timeDiffObject.years + 'yr ' : ''
  output += timeDiffObject.days !== 0 ? timeDiffObject.days + 'day ' : ''
  output += timeDiffObject.hours !== 0 ? timeDiffObject.hours + 'hr ' : ''
  output += timeDiffObject.minutes !== 0 ? timeDiffObject.minutes + 'm ' : ''

  if (output === '') {
    output += timeDiffObject.seconds + 's '
  }

  return output
}
