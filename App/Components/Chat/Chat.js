import React, { PropTypes } from 'react'
import { Text, View, ListView } from 'react-native'
import { chatStyles as styles } from './chatStyles'
import renderUserRow from './UserRow'

const Chat = ({friends, openChat}) => {
  return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.title}>Chat</Text>
        </View>
        <ListView
          enableEmptySections
          dataSource={friends}
          renderRow={(rowData, sectionId) => {
            return renderUserRow(rowData, sectionId, openChat)
          }}
       />
      </View>
    )
}

Chat.propTypes = {
  friends: PropTypes.object,
  openChat: PropTypes.func.isRequired
}

export default Chat

