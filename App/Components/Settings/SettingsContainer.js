import React, { Component } from 'react'
import Settings from './Settings'
import Index from '../../../index.ios'
import { AsyncStorage } from 'react-native'
import Landing from '../Landing/Landing'
import * as firebase from 'firebase'

class SettingsContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      myAccountData: [],
      accountActionsData: [
        {field: 'Logout', func: this.logout.bind(this)}
      ]
    }

    this.backButtonPressed = this.backButtonPressed.bind(this)
    this.logout = this.logout.bind(this)
    this.getUserFromStorage = this.getUserFromStorage.bind(this)
  }

  componentDidMount () {
    this.getUserFromStorage();
  }

  backButtonPressed () {
    this.props.navigator.pop()
  }

  async getUserFromStorage () {
    try{
      const user = await AsyncStorage.getItem('user');
      const userObj = JSON.parse(user);
      this.setState({myAccountData: [
        {field: 'Name', val: userObj.firstname + " " + userObj.lastname},
        {field: 'Username', val: userObj.username},
        {field: 'Mobile Number', val: userObj.phoneNumber},
        {field: 'Email', val: userObj.email}
      ]});
    } catch (error) {
      console.log('Error retrieving user from local storage: ', error)
    }
  }

  logout () {
    firebase.auth().signOut()
    .then((a) => {
      console.log(a)
    })
    .catch((e) => {
      console.log(e)
    })
    this.props.navigator.replace({
      title: 'Index',
      component: Index
    })
  }

  render () {
    return (
      <Settings myAccountData={this.state.myAccountData}
                accountActionsData={this.state.accountActionsData}
                backButtonPressed={this.backButtonPressed}
                logoutPressed={this.logout} />
    )
  }
}

export default SettingsContainer
