import React, { Component } from 'react'
import { AppRegistry, NavigatorIOS } from 'react-native'
import Landing from './App/Components/Landing/Landing'
import MainContainer from './App/Components/Main/MainContainer'
import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyA1ibIJsCQv8KBNMhg5D91PvuYI3QM5viU',
  authDomain: 'snapchat-da2b5.firebaseapp.com',
  databaseURL: 'https://snapchat-da2b5.firebaseio.com',
  storageBucket: 'snapchat-da2b5.appspot.com',
  messagingSenderId: '927676989151'
}

firebase.initializeApp(firebaseConfig)

class SnapChat extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoggedIn: true
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
          initialRoute={{title: 'Landing', component: Landing, passProps: { loginSuccess: this.onLogin }}}
        />
      )
    }
    return (
      <MainContainer />
    )
  }
}

AppRegistry.registerComponent('SnapChat', () => SnapChat)
