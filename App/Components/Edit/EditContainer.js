import React, { Component, PropTypes } from 'react'
import { CameraRoll } from 'react-native'
import Edit from './Edit'
import SendContianer from '../Send/SendContainer'

class EditContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      textVisible: false,
      timer: '3',
      encodedSignature: null
    }

    this.backPressed = this.backPressed.bind(this)
    this.send = this.send.bind(this)
    this.textPressed = this.textPressed.bind(this)
    this.onTimerValueChange = this.onTimerValueChange.bind(this)
    this.onReset = this.onReset.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onUpdate = this.onUpdate.bind(this)
  }

  onTimerValueChange(value : string) {
    this.setState({
      timer: value
    });
  }

  backPressed () {
    this.props.navigator.pop()
  }

  send (imageUri) {
    this.props.navigator.push({
      title: 'sendToFriends',
      component: SendContianer,
      passProps: {
        imageUri
      }
    })
  }

  textPressed () {
    this.setState({textVisible: !this.state.textVisible});
  }

  /**
   * Do extra things after the sketch reset
   */
  onReset() {
    console.log('The drawing has been cleared!');
  }

  /**
   * The Sketch component provides a 'saveImage' function (promise),
   * so that you can save the drawing in the device and get an object
   * once the promise is resolved, containing the path of the image.
   */
  onSave() {
    // this.sketch.saveImage(this.state.encodedSignature)
    //     .then((data) => console.log(data))
    //     .catch((error) => console.log(error));
    CameraRoll.saveToCameraRoll(this.props.uri, 'photo')
  }

  /**
   * On every update (touch up from the drawing),
   * you'll receive the base64 representation of the drawing as a callback.
   */
  onUpdate(base64Image) {
    this.setState({ encodedSignature: base64Image });
  }

  render () {
    return <Edit
      backPressed={this.backPressed}
      onSendPressed={this.send}
      onTextPressed={this.textPressed}
      textVisible={this.state.textVisible}
      uri={this.props.uri}
      timer={this.state.timer}
      onTimerValueChange={this.onTimerValueChange}
      onReset={this.onReset}
      onUpdate={this.onUpdate}
      onSave={this.onSave}
    />
  }
}

EditContainer.propTypes = {
  navigator: PropTypes.object,
  uri: PropTypes.string
}

export default EditContainer
