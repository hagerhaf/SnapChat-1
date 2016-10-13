import React, { Component } from 'react'
import Settings from './Settings'
import Index from '../../../index.ios'
import * as firebase from 'firebase'

class SettingsContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      myAccountData: [
        {field: 'Name'},
        {field: 'Username'},
        {field: 'Birthday'},
        {field: 'Mobile Number'},
        {field: 'Email'},
        {field: 'Bitmoji'},
        {field: 'Password'},
        {field: 'Login Verification'},
        {field: 'Notifications'},
        {field: 'Memories'}
      ],
      additionalServicesData: [
        {field: 'Manage'}
      ],
      whoCanData: [
        {field: 'Contact me'},
        {field: 'View My Story'},
        {field: 'See me in Quick Add'}
      ],
      moreInformationData: [
        {field: 'Support'},
        {field: 'Privacy Policy'},
        {field: 'Terms of Service'},
        {field: 'Licences'}
      ],
      accountActionsData: [
        {field: 'Clear cache'},
        {field: 'Clear Conversations'},
        {field: 'Restore purchases'},
        {field: 'Blocked'},
        {field: 'Logout', func: this.logout.bind(this)}
      ]
    }

    this.backButtonPressed = this.backButtonPressed.bind(this)
    this.logout = this.logout.bind(this)
  }

  backButtonPressed () {
    this.props.navigator.pop()
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
    return <Settings
      myAccountData={this.state.myAccountData}
      additionalServicesData={this.state.additionalServicesData}
      whoCanData={this.state.whoCanData}
      moreInformationData={this.state.moreInformationData}
      accountActionsData={this.state.accountActionsData}
      backButtonPressed={this.backButtonPressed}
      logoutPressed={this.logout}
        />
  }
}

export default SettingsContainer
