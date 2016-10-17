import React, {PropTypes} from 'react'
import {Text, View, TouchableWithoutFeedback, Image} from 'react-native'
import {AddByUsernameStyles as styles} from './AddByUsernameStyles'

const seperatorResults = (sectionID, rowID, adjacentRowHighlighted) => (
  <View key={`sep-${sectionID}-${rowID}`}
        style={styles.seperator} />
)

seperatorResults.propTypes = {
    sectionID: PropTypes.number.required,
    rowID: PropTypes.number.required,
    adjacentRowHighlighted: PropTypes.bool.required
}

const renderResultRow = ({name, highLighted}, sectionId, rowId, highlightRow, onSelectFriend) => {
  return (
    <TouchableWithoutFeedback key={rowId}
                              onPress={() => onSelectFriend(rowId)} >
        <View style={!highLighted ? styles.userRow : styles.userRowHighlighted}>
            <View style={styles.ImagePosition}>
                <Image source={require('../../../images/friend_icon.png')}
                       style={styles.imageIcon} />
            </View>
            <Text style={highLighted ? styles.highlighted : styles.nonHighlighted}>{name}</Text>
        </View>
    </TouchableWithoutFeedback>
  )
}

renderResultRow.propTypes = {
    name: PropTypes.string.required,
    highLighted: PropTypes.bool.isRequired
}

export default renderResultRow
export {seperatorResults}
