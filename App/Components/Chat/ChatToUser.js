import React, { Component } from 'react'
import { Text, View, TextInput, ListView, Image } from 'react-native'
import * as firebase from 'firebase'
import database, { authentication } from '../FireBase/FireBase'
import { chatToUserStyles as styles } from './chatStyles'
import KeyboardSpacer from 'react-native-keyboard-spacer'

const chatMessages = []

class ChatToUser extends Component {
  constructor (props) {
    super(props)

    this.state = {
      messages: messages.cloneWithRows([]),
      chatInput: ''
    }

    this.updateText = this.updateText.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
  }

  componentDidMount () {
    // see if we can bundle this together / clean it up somehow
    const userId = authentication.currentUser.uid
    console.log(userId)
    console.log(this.props.uid);
    const getMessages = database.ref(`userObjects/messages/${userId}/${this.props.uid}`)
    getMessages.on('value', (snapshot) => {
      snapshot.forEach(child => {
        chatMessages.push(child.val())
      })
      this.setState({ messages: messages.cloneWithRows(chatMessages) })
    })
  }

  updateText (text) {
    this.setState({ chatInput: text })
  }

  sendMessage () {
    const userId = authentication.currentUser.uid
    const time = `${new Date()}`
    const message = {
      message: this.state.chatInput,
      timestamp: time
    }
    const send = database.ref(`userObjects/messages/${this.props.uid}/${userId}`)
    send.push(message)
    chatMessages.push(message)
    this.setState({ chatInput: '', messages: messages.cloneWithRows(chatMessages) })
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

              <TextInput style={styles.textInput}
                         placeholder='Send a chat'
                         selectionColor='#F0030A'
                         value={this.state.chatInput}
                         onChangeText={this.updateText}
                         onSubmitEditing={this.sendMessage} />
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
  if (!userMessage) return null
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
