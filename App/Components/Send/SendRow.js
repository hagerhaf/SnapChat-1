import React, {PropTypes} from 'react'
import {Text, View, TouchableOpacity} from 'react-native'

const renderSendRow = ({name, highLighted}, sectionId, rowId, highlightRow, onSelectFriend) => {
  console.log(highLighted)
  if (highLighted) {
    return (
    <View key={rowId}>
      <TouchableOpacity
        onPress={function () {
          onSelectFriend(rowId)
        }}
        >
        <Text>highlighted {name}</Text>
      </TouchableOpacity>
    </View>
  )
  }
  return (
    <View key={rowId}>
      <TouchableOpacity
        onPress={function () {
          onSelectFriend(rowId)
        }}
        >
        <Text>{name}</Text>
      </TouchableOpacity>
    </View>
  )
}

renderSendRow.propTypes = {
  name: PropTypes.string.required,
  highLighted: PropTypes.bool.isRequired
}

export default renderSendRow
