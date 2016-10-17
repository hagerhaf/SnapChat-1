import React, { Component, PropTypes } from 'react'
import Me from './Me'
import AddedMeContainer from '../AddedMe/AddedMeContainer'
import AddFriendsContainer from '../AddFriends/AddFriendsContainer'
import MyFriendsContainer from '../MyFriends/MyFriendsContainer'
import SettingsContainer from '../Settings/SettingsContainer'
import {getCurrentUser} from '../FireBase/FireBase'

class MeContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      firstname: '',
      lastname: '',
      username: ''
    }
    this.addedMePressed = this.addedMePressed.bind(this)
    this.addFriendsPressed = this.addFriendsPressed.bind(this)
    this.myFriendsPressed = this.myFriendsPressed.bind(this)
    this.cameraBackPressed = this.cameraBackPressed.bind(this)
    this.settingsPressed = this.settingsPressed.bind(this)
  }

  addedMePressed () {
    this.props.navigator.push({
      title: 'AddedMeContainer',
      component: AddedMeContainer
    })
  }

  addFriendsPressed () {
    this.props.navigator.push({
      title: 'AddFriendsContainer',
      component: AddFriendsContainer,
      passProps: {
        navigator: this.props.navigator
      }
    })
  }

  myFriendsPressed () {
    this.props.navigator.push({
      title: 'MyFriendsContainer',
      component: MyFriendsContainer
    })
  }

  cameraBackPressed () {
    this.props.navigator.pop()
  }

  settingsPressed () {
    this.props.navigator.push({
      title: 'SettingsContainer',
      component: SettingsContainer
    })
  }

  componentDidMount () {
    getCurrentUser((currentUser) => {
      console.log('currentUser', currentUser)
      this.setState({
        firstname: currentUser.firstname,
        lastname: currentUser.lastname,
        username: currentUser.username
      })
    })
  }

  render () {
    return (
      <Me addedMePressed={this.addedMePressed}
          cameraBackPressed={this.cameraBackPressed}
          myFriendsPressed={this.myFriendsPressed}
          addFriendsPressed={this.addFriendsPressed}
          settingsPressed={this.settingsPressed}
          fullname={this.state.firstname + ' ' + this.state.lastname}
          username={this.state.username} />
    )
  }
}

MeContainer.propTypes = {
  navigator: PropTypes.object
}

export default MeContainer
