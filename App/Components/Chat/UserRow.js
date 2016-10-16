import React, { PropTypes } from 'react'
import { Text, View, TouchableHighlight, Image } from 'react-native'
import { chatStyles as styles, touchColor } from './chatStyles'
import constants from '../../constants'

const UserRow = ({username, uid, lastReceived, openChat, snaps, openSnaps}) => {
  const imageStatus = snaps ? constants.IMAGE_RECEIVED : constants.IMAGE_RECEIVED_SEEN
  console.log('imagestatus', imageStatus)
  return (
    <TouchableHighlight underlayColor={touchColor}
      onPress={snaps ? () => openSnaps(snaps) : () => openChat(username, uid)}
    >
      <View style={styles.userRow}>
        <View style={styles.imageIcon}>
          {imageStatusToDisplay(imageStatus)}
        </View>
        <View style={styles.userRowInfo}>
          <Text>{username}</Text>
          <Text style={styles.lastReceived}>Last received: {lastReceived}</Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}

UserRow.propTypes = {
  username: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  lastReceived: PropTypes.string,
  snaps: PropTypes.array,
  openChat: PropTypes.func.isRequired,
  openSnaps: PropTypes.func.isRequired
}

const renderUserRow = (userObject, i, openChat, openSnaps) => {
  return (
    <UserRow key={userObject.uid}
      username={userObject.username}
      uid={userObject.uid}
      lastReceived={userObject.lastReceived}
      openChat={openChat}
      snaps={userObject.snaps}
      openSnaps={openSnaps} />
  )
}

// / have to have images hardcorded... lmao
const imageStatusToDisplay = receivedStatus => {
  if (receivedStatus === constants.IMAGE_SENT) {
    return (
      <Image source={require('../../../images/chat/imageSent.png')} style={styles.imageStatus} />
  )
  } else if (receivedStatus === constants.IMAGE_SENT_SEEN) {
    return (
      <Image source={require('../../../images/chat/imageSentSeen.png')} style={styles.imageStatus} />
    )
  } else if (receivedStatus === constants.IMAGE_RECEIVED) {
    return (
      <Image source={require('../../../images/chat/imageReceived.png')} style={styles.imageStatus} />
    )
  } else if (receivedStatus === constants.IMAGE_RECEIVED_SEEN) {
    return (
      <Image source={require('../../../images/chat/imageReceivedSeen.png')} style={styles.imageStatus} />
    )
  } else if (receivedStatus === constants.TEXT_RECEIVED) {
    return (
      <Image source={require('../../../images/chat/textReceived.png')} style={styles.imageStatus} />
    )
  } else if (receivedStatus === constants.TEXT_RECEIVED_SEEN) {
    return (
      <Image source={require('../../../images/chat/textReceivedSeen.png')} style={styles.imageStatus} />
    )
  } else if (receivedStatus === constants.TEXT_SENT) {
    return (
      <Image source={require('../../../images/chat/textSent.png')} style={styles.imageStatus} />
    )
  } else if (receivedStatus === constants.TEXT_SENT_SEEN) {
    return (
      <Image source={require('../../../images/chat/textSentSeen.png')} style={styles.imageStatus} />
    )
  }
}

export default renderUserRow
