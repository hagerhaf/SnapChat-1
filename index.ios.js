import React, { Component } from 'react'
import { AppRegistry, NavigatorIOS } from 'react-native'
import Landing from './App/Components/Landing/Landing'
import MainContainer from './App/Components/Main/MainContainer'
import SplashScreen from './App/Components/SplashScreen/SplashScreen'
import * as firebase from 'firebase'

console.ignoredYellowBox = ['Warning: setState']

class SnapChat extends Component {
  constructor (props) {
    super(props)

    this.state = {
      checkingLogin: true,
      isLoggedIn: (firebase.auth().currentUser !== null)
    }

    this.onLogin = this.onLogin.bind(this)
  }

  onLogin () {
    this.setState({ isLoggedIn: true })
  }

  componentWillMount () {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      this.setState({
        isLoggedIn: (firebaseUser !== null),
        checkingLogin: false
      })
    })
  }

  render () {
    if (this.state.isLoggedIn) {
      return <MainContainer />
    }
    if (this.state.checkingLogin) {
      return <SplashScreen />
    }
    return (
      <NavigatorIOS style={{flex: 1}}
                    navigationBarHidden
                    initialRoute={{
                      title: 'Landing',
                      component: Landing,
                      passProps: { loginSuccess: this.onLogin }
                    }} />
    )
  }
}
export default SnapChat

AppRegistry.registerComponent('SnapChat', () => SnapChat)
