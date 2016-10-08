import React, { Component, PropTypes } from 'react'
import Edit from './Edit'
import SendContianer from '../Send/SendContainer'

class EditContainer extends Component {
  constructor (props) {
    super(props)

    this.backPressed = this.backPressed.bind(this)
    this.send = this.send.bind(this)
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

  render () {
    return <Edit
      backPressed={this.backPressed}
      onSendPressed={this.send}
    />
  }
}

EditContainer.propTypes = {
  navigator: PropTypes.object
}

export default EditContainer
