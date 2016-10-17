import React, { Component } from 'react'
import { Text, View, TextInput, ListView, Image } from 'react-native'
import database, { authentication } from '../FireBase/FireBase'
import { chatToUserStyles as styles } from './chatStyles'
import KeyboardSpacer from 'react-native-keyboard-spacer'

class ChatToUser extends Component {
  constructor (props) {
    super(props)

    this.state = {
      messages: messages.cloneWithRows([]),
      chatInput: ''
    }

    this.updateText = this.updateText.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.fetchReceivedMessages = this.fetchReceivedMessages.bind(this)
    this.fetchSentMessages = this.fetchSentMessages.bind(this)
    this.sortByTimeStamp = this.sortByTimeStamp.bind(this)
    this.onSizeChange = this.onSizeChange.bind(this)
  }

  componentDidMount () {
    mounted = true
    const userId = authentication.currentUser.uid
    this.fetchReceivedMessages(userId)
    this.fetchSentMessages(userId)
  }

  componentWillUnmount () {
    mounted = false
    chatMessages = []
  }

  onSizeChange () {
    this.listView.scrollTo({y: this.listView.getMetrics().contentLength - this.listViewHeight})
  }

  fetchReceivedMessages (userId) {
    const getMessages = database.ref(`userObjects/messages/${userId}/${this.props.uid}`)
    getMessages.on('value', (snapshot) => {
      snapshot.forEach(child => {
        const received = child.val()
        received.type = 'received'
        chatMessages.push(received)
        chatMessages = this.sortByTimeStamp(chatMessages)
      })
      if (mounted) {
        this.setState({ messages: messages.cloneWithRows(chatMessages) })
      }
    })
  }

  fetchSentMessages (userId) {
    const getSentMessages = database.ref(`userObjects/messages/${this.props.uid}/${userId}`)
    getSentMessages.on('value', (snapshot) => {
      snapshot.forEach(child => {
        chatMessages.push(child.val())
        chatMessages = this.sortByTimeStamp(chatMessages)
      })
      this.setState({ messages: messages.cloneWithRows(chatMessages) })
    })
  }

  sortByTimeStamp (messages) {
    return messages.sort((left, right) => {
      return new Date(left.timestamp).getTime() - new Date(right.timestamp).getTime()
    }).map((message) => JSON.stringify(message))
      .filter((message, i, arr) => arr.indexOf(message) === i)
      .map((message) => JSON.parse(message))
  }

  updateText (text) {
    this.setState({ chatInput: text })
  }

  sendMessage () {
    const userId = authentication.currentUser.uid
    const time = `${new Date()}`
    const message = {
      message: this.state.chatInput,
      timestamp: time,
      type: 'sent'
    }
    const send = database.ref(`userObjects/messages/${this.props.uid}/${userId}`)
    send.push(message)
    this.setState({ chatInput: '', messages: messages.cloneWithRows(chatMessages) })
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.chatToUserToolBar}>
          <Text style={styles.chatToUserToolBarButton} />
          <Text style={[styles.chatToUserToolBarTitle, styles.chatText]}>{this.props.username}</Text>
          <Text style={[styles.chatToUserToolBarButton, styles.chatText]}
            onPress={this.props.onBackPress}>
             Back
          </Text>
        </View>

        <View style={styles.content}>
          <View style={styles.messages}>
            <ListView dataSource={this.state.messages}
                      ref={ref => this.listView = ref}
                      onLayout={event => this.listViewHeight = event.nativeEvent.layout.height}
                      onContentSizeChange={this.onSizeChange}
                      renderRow={renderUserMessage}
                      enableEmptySections />
          </View>
          <View>
            <View style={styles.textInputBorder}>

              <TextInput style={styles.textInput}
                         placeholder="Send a chat"
                         selectionColor="#F0030A"
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

let mounted = false
let chatMessages = []
const messages = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

export default ChatToUser

const renderUserMessage = (userMessage) => {
  if (!userMessage) return null
  if (userMessage.type === 'sent') {
    if (userMessage.format === 'image') {
      return (
        <View style={styles.imageSentContainer}>
          <Image source={{uri: userMessage.message}} style={[styles.chatImage, styles.chatImageSent]} />
        </View>
      )
    }
    return (
      <View>
        <Text style={styles.messageThem}>{userMessage.message}</Text>
      </View>
    )
  } else if (userMessage.type === 'received') {
    if (userMessage.format === 'image') {
      return <Image source={{uri: userMessage.message}} style={styles.chatImage} />
    }
    return (
      <View style={styles.receivedMessageContainer}>
        <Text style={styles.messageMe}>
          <Text style={styles.messageNormal}>{userMessage.message}</Text>
        </Text>
      </View>
    )
  }
}
