import React, { PropTypes } from 'react'
import { Text, View, TextInput, TouchableHighlight } from 'react-native'
import { backArrow } from '../Login/Login'
import { registerStyles as styles } from './registerStyles'

const RegisterEmail = ({
  backButtonPressed,
  continueButtonPressed,
  updateEmail,
  hasValidInput
}) => (
  <View style={styles.container}>
    {backArrow(backButtonPressed)}

    <View style={styles.registerHeaderWrapper}>
      <Text style={styles.registerHeader}>
        Enter you email
      </Text>
    </View>

    <View style={styles.formContainer}>
      {inputFields(updateEmail)}
      {continueButton(hasValidInput, continueButtonPressed)}
    </View>

  </View>
)

const func = PropTypes.func

RegisterEmail.propTypes = {
  backButtonPressed: func.isRequired,
  continueButtonPressed: func.isRequired,
  updateEmail: func.isRequired,
  hasValidInput: PropTypes.bool
}

export default RegisterEmail

function inputFields (updateEmail) {
  return (
    <View>
      <Text style={styles.inputLabel}>
        Friends use your email to add you on Snapchat.
      </Text>
      <TextInput style={styles.formInput}
                 onChangeText={updateEmail} />
    </View>
  )
}

function continueButton (hasValidInput, continueButtonPressed) {
  return (
    <TouchableHighlight style={styles.signupButtonContainer}
                        onPress={hasValidInput ? continueButtonPressed : () => {}}
                        underlayColor='#F5F5F5'>
      <View style={hasValidInput
        ? styles.signupButtonActivated
        : styles.signupButtonDeactivated}>
        <Text style={hasValidInput
          ? styles.signupButtonActivatedText
          : styles.signupButtonDeactivatedText}
        >
          Continue
        </Text>
      </View>
    </TouchableHighlight>
  )
}
