import React, { Component } from 'react'
import { AppRegistry, NavigatorIOS } from 'react-native'
import Landing from './App/Components/Landing/Landing'
import MainContainer from './App/Components/Main/MainContainer'
// import * as firebase from 'firebase'
// import database from 'App/Components/FireBase/FireBase'

class SnapChat extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoggedIn: false
    }
    // TODO: can check here if user is logged in
    this.onLogin = this.onLogin.bind(this)
  }

  onLogin () {
    this.setState({isLoggedIn: true})
  }

  render () {
    if (!this.state.isLoggedIn) {
      return (
        <NavigatorIOS
          navigationBarHidden
          style={{flex: 1}}
          initialRoute={{component: Landing, passProps: { loginSuccess: this.onLogin }}}
        />
      )
    }
    return (
      <MainContainer />
    )
  }
}

AppRegistry.registerComponent('SnapChat', () => SnapChat)
