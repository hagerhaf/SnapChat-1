import React, { PropTypes } from 'react'
import { Text, View, TouchableWithoutFeedback, Image } from 'react-native'
import { sendStyles as styles } from './SendStyles'

const seperatorFriends = (sectionID, rowID) => {
  return <View style={styles.seperator}
               key={`sep-${sectionID}-${rowID}`} />
}

seperatorFriends.propTypes = {
  sectionID: PropTypes.number.required,
  rowID: PropTypes.number.required,
  adjacentRowHighlighted: PropTypes.bool.required
}

const renderSendRow = ({name, highLighted}, sectionId, rowId, highlightRow, onSelectFriend) => {
  return (
    <TouchableWithoutFeedback onPress={() => onSelectFriend(rowId)}
                              key={rowId}>
      <View style={!highLighted ? styles.userRow : styles.userRowHighlighted}>
        <Text style={highLighted ? styles.highlighted : styles.nonHighlighted}>{name}</Text>
        <View style={styles.ImagePosition}>
          <Image source={requireCheckBox(highLighted)}
                 style={styles.imageIcon} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

function requireCheckBox (highLighted) {
  if (highLighted) return require('../../../images/send.png')
  else return require('../../../images/send.png')
}

renderSendRow.propTypes = {
  name: PropTypes.string.required,
  highLighted: PropTypes.bool.isRequired
}

export default renderSendRow
export {seperatorFriends}
