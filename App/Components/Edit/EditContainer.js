import React, { Component, PropTypes } from 'react'
import Edit from './Edit'

class EditContainer extends Component {
  constructor (props) {
    super(props)

    this.backPressed = this.backPressed.bind(this)
  }

  backPressed () {
    this.props.navigator.pop()
  }

  render () {
    return <Edit
      backPressed={this.backPressed}
    />
  }
}

EditContainer.propTypes = {
  navigator: PropTypes.object
}

export default EditContainer
