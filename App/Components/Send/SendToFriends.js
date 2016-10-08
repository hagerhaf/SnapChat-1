import React, {PropTypes} from 'react'
import {View, Text, ListView, ScrollView} from 'react-native'
import {sendStyles as styles} from './SendStyles'

const SendToFriends = ({friends, renderSendUserRow, onSelectFriend, seperatorFriends, selectedFriends}) => {
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
        renderSeparator={seperatorFriends}

      />
      <View style={styles.heading}>
        <View style={styles.listToSend}>
          <ScrollView horizontal >
            {displaySelectedFriends(selectedFriends)}
          </ScrollView>
        </View>
        <Text style={[styles.titleBottom, styles.title]}> -></Text>
      </View>
    </View>
  )
}

const displaySelectedFriends = (selectedFriends) => {
  if (selectedFriends) {
    return selectedFriends.map((e, i) => {
      console.log(e)
      return <Text key={`${e.name}-${i}`}>{e.name}, </Text>
    })
  }
  return null
}

SendToFriends.propTypes = {
  friends: PropTypes.object,
  renderSendUserRow: PropTypes.func.isRequired,
  onSelectFriend: PropTypes.func.isRequired,
  seperatorFriends: PropTypes.func.isRequired,
  selectedFriends: PropTypes.array
}

export default SendToFriends
