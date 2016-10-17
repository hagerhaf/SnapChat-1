import React, { Component, PropTypes } from 'react'
import { Image, View, TouchableHighlight } from 'react-native'
import { memoriesStyles as styles } from './memoriesStyles'

class SendSnaps extends Component {
  constructor (props) {
    super(props)

    this.backButtonPressed = this.backButtonPressed.bind(this)
  }

  backButtonPressed () {
    this.props.navigator.pop()
  }

  render () {
    return (
      <View style={styles.selectedImageContainer}>
        <View style={styles.backArrowContainer}>
          <TouchableHighlight onPress={this.backButtonPressed}>
            <Image style={styles.backArrow}
                   source={require('../../../images/back_arrow_white.png')} />
          </TouchableHighlight>

          <Image style={[styles.selectedImage, {marginTop: 50}]} source={{uri: this.props.image}} />

          <View style={styles.selectedImageFooter}>
            <View style={styles.footerMenu}>
              <Image style={styles.sendIcon} source={require('../../../images/send.png')} />
            </View>
          </View>

        </View>
      </View>
    )
  }
}

SendSnaps.propTypes = {
  navigator: PropTypes.object,
  image: PropTypes.string
}

export default SendSnaps
