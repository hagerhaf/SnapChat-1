import React, {PropTypes} from 'react'
import {Text, View, TouchableOpacity, Image} from 'react-native'
import {sendStyles as styles} from './SendStyles'

const seperatorFriends = (sectionID, rowID, adjacentRowHighlighted) => {
  return (<View
    key={`sep-${sectionID}-${rowID}`}
    style={styles.seperator}
      />
  )
}

seperatorFriends.propTypes = {
  sectionID: PropTypes.number.required,
  rowID: PropTypes.number.required,
  adjacentRowHighlighted: PropTypes.bool.required
}

const renderSendRow = ({name, highLighted}, sectionId, rowId, highlightRow, onSelectFriend) => {
  return (
    <TouchableOpacity
      onPress={function () {
        onSelectFriend(rowId)
        // highlightRow(sectionId, rowId)
      }}
      key={rowId}
        >
      <View style={!highLighted ? styles.userRow : styles.userRowHighlighted}>
        <Text style={highLighted ? styles.highlighted : styles.nonHighlighted}>{name}</Text>
        <View style={styles.ImagePosition}>
          <Image
            source={requireCheckBox(highLighted)}
            style={styles.imageIcon} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

function requireCheckBox (highLighted) {
  if (highLighted) return require('../../../images/sendTo/checkboxTicked.png')
  else return require('../../../images/sendTo/checkbox.png')
}

renderSendRow.propTypes = {
  name: PropTypes.string.required,
  highLighted: PropTypes.bool.isRequired
}

export default renderSendRow
export {seperatorFriends}
