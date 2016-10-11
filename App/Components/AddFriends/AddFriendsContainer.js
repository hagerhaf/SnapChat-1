import React, { Component } from 'react'
import AddFriends from './AddFriends'
import AddByUsernameContainer from '../AddByUsername/AddByUsername'

class AddFriendsContainer extends Component {
  constructor (props) {
    super(props)

    this.backButtonPressed = this.backButtonPressed.bind(this)
    this.addByUsernamePressed = this.addByUsernamePressed.bind(this)
  }

  backButtonPressed () {
    this.props.navigator.pop()
  }

  addByUsernamePressed () {
    this.props.navigator.push({
      title: 'AddByUsernameContainer',
      component: AddByUsernameContainer
    })
  }

  render () {
    return <AddFriends
        backButtonPressed={this.backButtonPressed}
        addByUsernamePressed={this.addByUsernamePressed}
    />
  }
}

export default AddFriendsContainer
