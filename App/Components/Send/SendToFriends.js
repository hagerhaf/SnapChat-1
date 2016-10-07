import React, {PropTypes} from 'react'
import {View, Text, ListView} from 'react-native'
import {sendStyles as styles} from './SendStyles'

const SendToFriends = ({friends, renderSendUserRow, onSelectFriend}) => {
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.title}>Send To...</Text>
      </View>
      <ListView
        enableEmptySections
        dataSource={friends}
        renderRow={function (data, sectionId, rowId, highlightRow) {
          return renderSendUserRow(data, sectionId, rowId, highlightRow, onSelectFriend)
        }}
      />
    </View>
  )
}

SendToFriends.propTypes = {
  friends: PropTypes.object,
  renderSendUserRow: PropTypes.func.isRequired,
  onSelectFriend: PropTypes.func.isRequired
}

export default SendToFriends
