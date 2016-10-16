import React, { Component, PropTypes } from 'react'
import Camera from 'react-native-camera'
import { mainStyles as styles } from './mainStyles'
import EditContainer from '../Edit/EditContainer'
import { Text, View, Image, TouchableHighlight, CameraRoll } from 'react-native'
import {getSnapsCurrentUser} from '../FireBase/FireBase'

const FLASH_LOOKUP = {'auto': 'on', 'on': 'off', 'off': 'auto'}

class CameraContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      frontCamera: false,
      flash: 'auto',
      snapCount: 0
    }

    this.cameraTogglePressed = this.cameraTogglePressed.bind(this)
    this.flashTogglePressed = this.flashTogglePressed.bind(this)
    this.takePicture = this.takePicture.bind(this)
    this.getSnaps = this.getSnaps.bind(this)
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

  getSnaps () {
    getSnapsCurrentUser((snaps) => {
      console.log(snaps)
      if (snaps === null) {
        this.setState({
          snapCount: 0
        })
      } else {
        this.setState({
          snapCount: Object.keys(snaps).length
        })
      }
    })
  }

  // Take photo and send to EditContainer.
  takePicture () {
    this.camera.capture()
    .then((data) =>
        this.props.navigator.push({
          component: EditContainer,
          title: 'Edit Container',
          passProps: { uri: data['path'] }
        }))
    .catch(err => console.log(err))
  }

  componentDidMount () {
    this.getSnaps()
  }

  render () {
    var flashIcon
    switch (this.state.flash) {
      case 'auto': {
        flashIcon = require('../../../images/main-camera/flash-auto-icon.png')
        break
      }
      case 'on': {
        flashIcon = require('../../../images/main-camera/flash-on-icon.png')
        break
      }
      case 'off': {
        flashIcon = require('../../../images/main-camera/flash-off-icon.png')
        break
      }
    }
    return (
      <View style={styles.container}>
        {/* Camera view must be camera to allow for it to take up entire screen. */}
        <Camera ref={(cam) => { this.camera = cam }}
          style={styles.preview}
          captureTarget={Camera.constants.CaptureTarget.disk}
          aspect={Camera.constants.Aspect.fill}
          flashMode={this.state.flash === 'auto' ? Camera.constants.FlashMode.auto :
                  (this.state.flash === 'on' ? Camera.constants.FlashMode.on : Camera.constants.FlashMode.off)}
          type={this.state.frontCamera ? 'front' : 'back'}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableHighlight onPress={this.flashTogglePressed}>
              <Image
                source={flashIcon}
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
                <Text
                  style={[styles.chatIcon, this.state.snapCount > 0 ? styles.active : null]}
                >
                  {this.state.snapCount}
                </Text>
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
