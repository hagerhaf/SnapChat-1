import React, { Component, PropTypes } from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import { AsyncStorage } from 'react-native'
import * as firebase from 'firebase'
import RegisterName from './RegisterName'
import RegisterBirthday from './RegisterBirthday'
import RegisterEmail from './RegisterEmail'
import RegisterPhoneNumber from './RegisterPhoneNumber'
import RegisterPassword from './RegisterPassword'
import LoginContainer from '../Login/LoginContainer'
import database, { authentication } from '../FireBase/FireBase'

class RegisterContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      phoneNumber: '',
      birthday: new Date(),
      password: '',
      loading: false,
      isNameInputValid: false,
      isBirthdayInputValid: false,
      isEmailValid: false,
      isUsernameInputValid: false,
      isPasswordInputValid: false,
      isPhoneNumberInputValid: false,
      nameComplete: false,
      birthdayComplete: false,
      usernameComplete: false,
      emailComplete: false,
    }

    this.backButtonPressed = this.backButtonPressed.bind(this)
    this.updateFirstname = this.updateFirstname.bind(this)
    this.updateLastname = this.updateLastname.bind(this)
    this.updateBirthday = this.updateBirthday.bind(this)
    this.updateEmail = this.updateEmail.bind(this)
    this.updateUsername = this.updateUsername.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
    this.updatePhoneNumber = this.updatePhoneNumber.bind(this)

    this.goToRegisterBirthday = this.goToRegisterBirthday.bind(this)
    this.goToRegisterUsername = this.goToRegisterUsername.bind(this)
    this.goToRegisterPhoneNumber = this.goToRegisterPhoneNumber.bind(this)
    this.goToRegisterPassword = this.goToRegisterPassword.bind(this)
    this.finishRegistration = this.finishRegistration.bind(this)
  }

  backButtonPressed () {
    this.props.navigator.pop()
  }

  toggleSpinner () {
    this.setState({
      loading: !this.state.loading
    })
  }

  updateFirstname (updatedFirstname) {
    if (updatedFirstname && this.state.lastname) {
      this.setState({ firstname: updatedFirstname, isNameInputValid: true })
    } else {
      this.setState({ firstname: updatedFirstname, isNameInputValid: false })
    }
  }

  updateLastname (updatedLastname) {
    if (updatedLastname && this.state.firstname) {
      this.setState({ lastname: updatedLastname, isNameInputValid: true })
    } else {
      this.setState({ lastname: updatedLastname, isNameInputValid: false })
    }
  }

  updateBirthday (updateBirthday) {
    this.setState({ birthday: updateBirthday, isBirthdayInputValid: true })
  }

  updateEmail (updatedEmail) {
    if (updatedEmail) {
      this.setState({ email: updatedEmail, isEmailValid: true })
    } else {
      this.setState({ email: updatedEmail, isEmailValid: false })
    }
  }

  updateUsername (updatedUsername) {
    if (updatedUsername) {
      this.setState({ username: updatedUsername, isUsernameValid: true })
    } else {
      this.setState({ username: updatedUsername, isUsernameValid: false })
    }
  }

  updatePassword (updatedPassword) {
    if (updatedPassword) {
      this.setState({ password: updatedPassword, isPasswordInputValid: true })
    } else {
      this.setState({ password: updatedPassword, isPasswordInputValid: false })
    }
  }

  updatePhoneNumber (updatedPhoneNumber) {
    if (updatedPhoneNumber) {
      this.setState({phoneNumber: updatedPhoneNumber, isPhoneNumberInputValid: true})
    } else {
      this.setState({ password: updatedPhoneNumber, isPhoneNumberInputValid: false })
    }
  }

  goToRegisterBirthday () {
    this.setState({ nameComplete: true })
  }

  goToRegisterUsername () {
    this.setState({ birthdayComplete: true })
  }

  goToRegisterPhoneNumber() {
    this.setState({ emailComplete: true })
  }

  goToRegisterPassword () {
    this.setState({ usernameComplete: true })
  }

  finishRegistration () {
    this.toggleSpinner()
    const { email, password } = this.state
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user.uid)
        this.saveUser(user)
        this.updateUserDetails(user)
        this.toggleSpinner()
        this.props.loginSuccess()
      })
      .catch((error) => {
        this.toggleSpinner()
        console.log(error)
      })
  }

  async saveUser (user) {

    var userObj = {};
    var userRef = database.ref('users/' + user.uid);
    userRef.on('value', function (snapshot) {
      userObj = snapshot.val();
    });
    console.log(userObj);

    try {
      await AsyncStorage.setItem('userId', JSON.stringify(user.uid))
      await AsyncStorage.setItem('user', JSON.stringify(userObj))
    } catch (error) {
      console.log('Error saving user to local storage: ', error)
    }
  }

  updateUserDetails (user) {
    const { firstname, lastname, username, email, birthday, phoneNumber } = this.state
    const userId = user.uid
    console.log(phoneNumber);
    firebase.database().ref('users/' + userId).set({
      username,
      email,
      firstname,
      lastname,
      phoneNumber,
      birthday: JSON.stringify(birthday)
    })
  }

  render () {
    const spinner = this.state.loading
      ? <Spinner visible overlayColor='rgba(0,0,0,0.70)' />
      : null

    if (!this.state.nameComplete) {
      return (
        <RegisterName
          backButtonPressed={this.backButtonPressed}
          signupButtonPressed={this.goToRegisterBirthday}
          updateFirstname={this.updateFirstname}
          updateLastname={this.updateLastname}
          updateUsername={this.updateUsername}
          hasValidInput={this.state.isNameInputValid}
        />
      )
    } else if (this.state.nameComplete && !this.state.birthdayComplete) {
      return (
        <RegisterBirthday
          backButtonPressed={this.backButtonPressed}
          birthday={this.state.birthday}
          updateBirthday={this.updateBirthday}
          continueButtonPressed={this.goToRegisterUsername}
          hasValidInput={this.state.isBirthdayInputValid}
        />
      )
    } else if (this.state.birthdayComplete && !this.state.emailComplete) {
      return (
          <RegisterEmail
              backButtonPressed={this.backButtonPressed}
              updateEmail={this.updateEmail}
              continueButtonPressed={this.goToRegisterPhoneNumber}
              hasValidInput={this.state.isEmailValid}
          />
      )
    } else if (this.state.emailComplete && !this.state.usernameComplete) {
        return (
            <RegisterPhoneNumber
                backButtonPressed={this.backButtonPressed}
                updatePhoneNumber={this.updatePhoneNumber}
                continueButtonPressed={this.goToRegisterPassword}
                hasValidInput={this.state.isPhoneNumberInputValid}
            />
        )
    } else if (this.state.usernameComplete) {
      return (
        <RegisterPassword
          backButtonPressed={this.backButtonPressed}
          updatePassword={this.updatePassword}
          finishButtonPressed={this.finishRegistration}
          hasValidInput={this.state.isPasswordInputValid}
        >
          {spinner}
        </RegisterPassword>
      )
    }
  }
}

RegisterContainer.propTypes = {
  navigator: PropTypes.object,
  loginSuccess: PropTypes.func
}

export default RegisterContainer
