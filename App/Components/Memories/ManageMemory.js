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

  backButtonPressed () {
    this.props.navigator.pop()
  }

  render () {
    if (this.state.sendingToFriends) {
      return <SendMemoryContainer navigator={this.props.navigator}
                                  imageUri={this.props.uri}
                                  ref={ref => this.sendTo = ref} />
    }

    return (
      <View style={styles.selectedImageContainer}>
        <View style={styles.backArrowContainer}>
          <TouchableHighlight onPress={this.backButtonPressed}>
            <Image source={require('../../../images/back_arrow_white.png')}
                   style={styles.backArrow} />
          </TouchableHighlight>
        </View>

        <Image source={{uri: this.props.uri}}
               style={styles.selectedImage} />

        <View style={styles.selectedImageFooter}>
          <TouchableHighlight onPress={this.sendToFriends}>
            <Image source={require('../../../images/send.png')}
                   style={styles.sendIcon} />
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
