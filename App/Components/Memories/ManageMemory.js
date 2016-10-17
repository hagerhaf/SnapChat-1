import React, { Component, PropTypes } from 'react'
import { Image, View, TouchableHighlight } from 'react-native'
import { memoriesStyles as styles } from './memoriesStyles'
import SendMemoryContainer from './SendMemoryContainer'

class SendMemory extends Component {
  constructor (props) {
    super(props)

    this.state = {
      sendingToFriends: false
    }

    this.backButtonPressed = this.backButtonPressed.bind(this)
    this.sendToFriends = this.sendToFriends.bind(this)
  }

  sendToFriends () {
    this.setState({ sendingToFriends: true })
  }

  sendPhotoToChat () {
    this.ref.sendMemoryToChat()
  }

  backButtonPressed () {
    this.props.navigator.pop()
  }

  render () {
    if (this.state.sendingToFriends) {
      return <SendMemoryContainer imageUri={this.props.uri}
                                  ref={ref => this.sendTo = ref} />
    }

    return (
      <View style={styles.selectedImageContainer}>
        <View style={styles.backArrowContainer}>
          <TouchableHighlight onPress={this.backButtonPressed}>
            <Image
              style={styles.backArrow}
              source={require('../../../images/back_arrow_white.png')} />
          </TouchableHighlight>
        </View>

        <Image style={styles.selectedImage} source={{uri: this.props.uri}} />

        <View style={styles.selectedImageFooter}>
          <View style={styles.footerMenu}>

            <View style={styles.utilIcons}>
              <Image style={styles.icon} source={require('../../../images/trash.png')} />
              <Image style={styles.icon} source={require('../../../images/upload.png')} />
            </View>

          </View>

          <TouchableHighlight onPress={this.sendToFriends}>
            <Image style={styles.sendIcon} source={require('../../../images/send.png')} />
          </TouchableHighlight>

        </View>
      </View>
    )
  }
}

SendMemory.propTypes = {
  navigator: PropTypes.object,
  uri: PropTypes.string
}

export default SendMemory
