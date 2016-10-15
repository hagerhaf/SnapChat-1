import React, { Component } from 'react'
import { Text, View, TextInput, ListView, Image } from 'react-native'
import database, { authentication } from '../FireBase/FireBase'
import { chatToUserStyles as styles } from './chatStyles'
import KeyboardSpacer from 'react-native-keyboard-spacer'

class ChatToUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      messages: messages.cloneWithRows([])
    }
  }

  componentDidMount () {
    // const component = this
    // const userId = authentication.currentUser.uid
    // const newMessages = []
    // database.ref(`userObjects/messages/${userId}/received/${this.props.uid}`)
    //   .on('value', (snapshot) => {
    //     snapshot.forEach((child) => {
    //       newMessages.push(child.val())
    //       component.setState({messages: messages.cloneWithRows(newMessages)})
    //     })
    //   })
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.chatToUserToolBar}>
          <Text style={styles.chatToUserToolBarButton}>DropDown</Text>
          <Text style={[styles.chatToUserToolBarTitle, styles.chatText]}>{this.props.username}</Text>
          <Text style={[styles.chatToUserToolBarButton, styles.chatText]}
                onPress={this.props.onBackPress}>
            Back
          </Text>
        </View>
        <View style={styles.content}>

          <View style={styles.messages}>

            <ListView dataSource={this.state.messages}
                      renderRow={renderUserMessage}
                      enableEmptySections />

          </View>

          <View>
            <View style={styles.textInputBorder}>
              <TextInput style={styles.textInput} placeholder='Send a chat' selectionColor='#F0030A' />
            </View>
            <View style={styles.sendToolBar}>
            <Image source={require('../../../images/chat/gallery.png')} style={styles.toolBarImage} />
              <Image source={require('../../../images/chat/phone.png')} style={styles.toolBarImage} />
              <Image source={require('../../../images/chat/cameraIconSmallChat.png')} style={styles.toolBarImage} />
              <Image source={require('../../../images/chat/video.png')} style={styles.toolBarImage} />
              <Image source={require('../../../images/chat/emoticonFace.png')} style={styles.toolBarImage} />
            </View>
          </View>
        </View>
        <KeyboardSpacer />
      </View>
    )
  }
}

const messages = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

export default ChatToUser

const renderUserMessage = (userMessage, i) => {
  console.log(userMessage)
  if (userMessage.from) {
    return (
      <View>
        <Text style={styles.messageThem}>|
          <Text style={styles.messageNormal}>{userMessage.message}</Text>
        </Text>
      </View>
    )
  } else {
    return (
      <View>
        <Text style={styles.messageMe}>|
          <Text style={styles.messageNormal}>{userMessage.message}</Text>
        </Text>
      </View>
    )
  }
}
