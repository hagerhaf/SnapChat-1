import React, { PropTypes } from 'react'
import { View, Text, ListView, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { sendStyles as styles } from './SendStyles'

const SendToFriends = ({
  friends,
  renderSendUserRow,
  onSelectFriend,
  seperatorFriends,
  selectedFriends,
  onBackPress,
  onSendPressed,
  isSending,
  hasSent,
  sendError
}) => {
  function isSendingFunction (isSending, success, failure) {
    if (isSending) {
      return (
        <ActivityIndicator animating
                           style={[styles.centering, {height: 35}]}
                           size="large"
                           color="white" />
      )
    }
    if (success) {
      return (
        <Image source={require('../../../images/sendTo/sendSuccess.png')} style={styles.imageIconSend} />
      )
    }
    if (failure) {
      return (
        <TouchableOpacity onPress={onSendPressed}>
          <Image source={require('../../../images/sendTo/failCross.png')} style={styles.imageIconSend} />
        </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity onPress={onSendPressed}>
        <Image source={require('../../../images/sendTo/sendArrow.png')} style={styles.imageIconSend} />
      </TouchableOpacity>
    )
  }

  function headingResults (hasSent, sendError) {
    if (hasSent) {
      return styles.headingColorSuccess
    }
    if (sendError) {
      return styles.headingColorError
    }
  }

  function displayText (sending, success, fail) {
    if (sending) {
      return (<Text style={styles.title}>
        {'Sending...'}
      </Text>)
    }
    if (success) {
      return (<Text style={styles.title}>
        {'Successfully sent!'}
      </Text>)
    }
    if (fail) {
      return (<Text style={styles.title}>
        {'Send failed please try again!'}
      </Text>)
    }
    return (<Text style={styles.title}>
      {'Send to...'}
    </Text>)
  }

  return (
    <View style={styles.container}>
      <View style={[styles.heading, headingResults(hasSent, sendError)]}>
        <TouchableOpacity onPress={onBackPress}>
          <Text style={styles.title}>
            {'< '}
          </Text>
        </TouchableOpacity>
        {displayText(isSending, hasSent, sendError)}
      </View>
      <ListView
        enableEmptySections
        dataSource={friends}
        renderRow={function (data, sectionId, rowId, highlightRow) {
          return renderSendUserRow(data, sectionId, rowId, highlightRow, onSelectFriend)
        }}
        renderSeparator={seperatorFriends}
        renderSectionHeader={function () {
          return <Text style={styles.subHeading}> Friends </Text>
        }}

      />
      <View style={[styles.heading, styles.headingBottom, headingResults(hasSent, sendError)]} >
        <View style={styles.listToSend}>
          <ScrollView horizontal >
            {displaySelectedFriends(selectedFriends)}
          </ScrollView>
        </View>
        <View style={styles.ImagePosition}>
          {isSendingFunction(isSending, hasSent, sendError)}
        </View>
      </View>
    </View>
  )
}

const displaySelectedFriends = (selectedFriends) => {
  if (selectedFriends) {
    return selectedFriends.map((e, i) => {
      return <Text style={styles.displayFriends} key={`${e.name}-${i}`}>{e.name}, </Text>
    })
  }
  return null
}

SendToFriends.propTypes = {
  friends: PropTypes.object,
  renderSendUserRow: PropTypes.func.isRequired,
  onSelectFriend: PropTypes.func.isRequired,
  seperatorFriends: PropTypes.func.isRequired,
  selectedFriends: PropTypes.array,
  onBackPress: PropTypes.func.isRequired,
  onSendPressed: PropTypes.func.isRequired,
  isSending: PropTypes.bool.isRequired,
  hasSent: PropTypes.bool,
  sendError: PropTypes.bool
}

export default SendToFriends
