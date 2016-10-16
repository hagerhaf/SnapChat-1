import React, { PropTypes } from 'react'
import { Text, View, ListView, ActivityIndicator } from 'react-native'
import { chatStyles as styles } from './chatStyles'
import renderUserRow from './UserRow'

const Chat = ({friends, openChat, loading}) => {
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.title}>Chat</Text>
      </View>
      {
        loading
          ? <ActivityIndicator style={{marginTop: 30}}
                               animating
                               size='large' />

          : <ListView enableEmptySections
                         dataSource={friends}
                         renderRow={(rowData, sectionId) => renderUserRow(rowData, sectionId, openChat)} />
      }
    </View>
  )
}

Chat.propTypes = {
  friends: PropTypes.object,
  openChat: PropTypes.func.isRequired
}

export default Chat
