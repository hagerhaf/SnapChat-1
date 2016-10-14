import React, { Component } from 'react'
import { AppRegistry, NavigatorIOS } from 'react-native'
import Landing from './App/Components/Landing/Landing'
import MainContainer from './App/Components/Main/MainContainer'
import * as firebase from 'firebase'

class SnapChat extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoggedIn: (firebase.auth().currentUser !== null)
    }
    this.onLogin = this.onLogin.bind(this)
  }

  onLogin () {
    this.setState({isLoggedIn: true})
  }

  componentWillMount () {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      this.setState({
        loggedIn: (firebaseUser !== null)
      })

      if (firebaseUser) {
        console.log('Logged IN', firebaseUser)
      } else {
        console.log('Not logged in')
      }
    })
  }

  render () {
    if (this.state.isLoggedIn) {
      return (<MainContainer />)
    }
    return (
      <NavigatorIOS
        navigationBarHidden
        style={{flex: 1}}
        initialRoute={{title: 'Landing', component: Landing, passProps: { loginSuccess: this.onLogin }}}
      />
    )
  }
}
export default SnapChat

AppRegistry.registerComponent('SnapChat', () => SnapChat)
