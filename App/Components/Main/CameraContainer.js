import React, { Component, PropTypes } from 'react'
import Camera from 'react-native-camera'
import { mainStyles as styles } from './mainStyles'
import EditContainer from "../Edit/EditContainer";
import { Text, View, Image, TouchableHighlight } from 'react-native'

const FLASH_LOOKUP = {'auto': 'on', 'on': 'off', 'off': 'auto'}

class CameraContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      frontCamera: false,
      flash: 'auto'
    }

    this.cameraTogglePressed = this.cameraTogglePressed.bind(this)
    this.flashTogglePressed = this.flashTogglePressed.bind(this)
    this.takePicture = this.takePicture.bind(this)
  }

  cameraTogglePressed () {
    this.setState({
      frontCamera: !this.state.frontCamera
    })
  }

  flashTogglePressed () {
    this.setState({
      flash: FLASH_LOOKUP[this.state.flash]
    })
  }

  // Saves user photo to the camera roll.
  takePicture () {
    this.camera.capture()
    .then((data) => console.log(data))
    .catch(err => console.log(err))
    this.props.navigator.push({
      title: 'EditContainer',
      component: EditContainer
    })
  }

  render () {
    return (
      <View style={styles.container}>
        {/* Camera view must be camera to allow for it to take up entire screen. */}
        <Camera ref={(cam) => { this.camera = cam }}
                style={styles.preview}
                aspect={Camera.constants.Aspect.fill}
                flashMode={this.state.flashText === 'auto' ? Camera.constants.FlashMode.auto :
                  (this.state.flashText === 'on' ? Camera.constants.FlashMode.on : Camera.constants.FlashMode.off)}
                type={this.state.frontCamera ? 'front' : 'back'}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableHighlight onPress={this.flashTogglePressed}>
              <Image
                source={require('../../../images/main-camera/flash-icon.png')}
                style={styles.flashIcon}
              />
            </TouchableHighlight>
            <TouchableHighlight>
              <Image
                source={require('../../../images/main-camera/ghost-top-logo.png')}
                style={styles.ghostIcon}
              />
            </TouchableHighlight>
            <TouchableHighlight onPress={this.cameraTogglePressed}>
              <Image
                source={require('../../../images/main-camera/selfie-icon.png')}
                style={styles.selfieIcon}
              />
            </TouchableHighlight>
          </View>
          {/* Footer, including capture */}
          <View style={styles.footer}>
            {/* Capture */}
            <TouchableHighlight onPress={this.takePicture}>
              <Image
                source={require('../../../images/main-camera/capture-circle.png')}
                style={styles.captureIcon}
              />
            </TouchableHighlight>
            {/* Button navigation */}
            <View style={styles.header}>
              <TouchableHighlight>
                <Image
                  source={require('../../../images/main-camera/chatbubble.png')}
                  style={styles.chatIcon}
                />
              </TouchableHighlight>
              <TouchableHighlight style={styles.flex}>
                <Image
                  source={require('../../../images/main-camera/capture-circle.png')}
                  style={styles.memoriesIcon}
                />
              </TouchableHighlight>
              <TouchableHighlight>
                <Image
                  source={require('../../../images/main-camera/stories-icon.png')}
                  style={styles.storiesIcon}
                />
              </TouchableHighlight>
            </View>
          </View>
        </Camera>
      </View>
    )
  }
}

CameraContainer.propTypes = {
  navigator: PropTypes.object.isRequired
}

export default CameraContainer
