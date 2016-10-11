import React, { Component } from 'react'
import AddFriends from './AddFriends'
import AddByUsernameContainer from '../AddByUsername/AddByUsername'
import AddByAddressBookContainer from '../AddByAddressBook/AddByAddressBook'

class AddFriendsContainer extends Component {
  constructor (props) {
    super(props)

    this.backButtonPressed = this.backButtonPressed.bind(this)
    this.addByUsernamePressed = this.addByUsernamePressed.bind(this)
    this.addByAddressBookPressed = this.addByAddressBookPressed.bind(this)
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

  addByAddressBookPressed () {
    this.props.navigator.push({
      title: 'AddByAddressBookContainer',
      component: AddByAddressBookContainer
    })
  }

  render () {
    return <AddFriends
        backButtonPressed={this.backButtonPressed}
        addByUsernamePressed={this.addByUsernamePressed}
        addByAddressBookPressed={this.addByAddressBookPressed}
    />
  }
}

export default AddFriendsContainer
