import React, { Component, PropTypes } from 'react'
import Edit from './Edit'
import SendContianer from '../Send/SendContainer'

class EditContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      textVisible: false,
      timer: '3',
      selectedItem: undefined,
      results: {
        items: []
      }
    }

    this.backPressed = this.backPressed.bind(this)
    this.send = this.send.bind(this)
    this.textPressed = this.textPressed.bind(this)
    this.onTimerValueChange = this.onTimerValueChange.bind(this)
  }

  onTimerValueChange(value : string) {
    this.setState({
      timer: value
    });
  }

  backPressed () {
    this.props.navigator.pop()
  }

  send () {
    this.props.navigator.push({
      title: 'sendToFriends',
      component: SendContianer
    })
  }

  textPressed () {
    this.setState({textVisible: !this.state.textVisible});
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
    />
  }
}

EditContainer.propTypes = {
  navigator: PropTypes.object,
  uri: PropTypes.string
}

export default EditContainer
