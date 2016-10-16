import React, { PropTypes } from 'react'
import { Text, View, TextInput, TouchableHighlight } from 'react-native'
import { backArrow } from '../Login/Login'
import { registerStyles as styles } from './registerStyles'

const RegisterPhoneNumber = ({
    backButtonPressed,
    continueButtonPressed,
    updatePhoneNumber,
    hasValidInput
}) => (
    <View style={styles.container}>
        {backArrow(backButtonPressed)}

        <View style={styles.registerHeaderWrapper}>
            <Text style={styles.registerHeader}>Enter your phone number</Text>
        </View>

        <View style={styles.formContainer}>
            {inputFields(updatePhoneNumber)}
            {continueButton(hasValidInput, continueButtonPressed)}
        </View>

    </View>
)

const func = PropTypes.func

RegisterPhoneNumber.propTypes = {
    backButtonPressed: func.isRequired,
    continueButtonPressed: func.isRequired,
    updatePhoneNumber: func.isRequired,
    hasValidInput: PropTypes.bool
}

export default RegisterPhoneNumber

function inputFields (updatePhoneNumber) {
    return (
        <View>
            <Text style={styles.inputLabel}>
                Friends use your phone number to add you on Snapchat.
            </Text>
            <TextInput
                style={styles.formInput}
                onChangeText={updatePhoneNumber}
            />
        </View>
    )
}

function continueButton (hasValidInput, continueButtonPressed) {
    return (
        <TouchableHighlight
            style={styles.signupButtonContainer}
            onPress={hasValidInput ? continueButtonPressed : () => {}} // TODO: can prob provide error msg
            underlayColor='#F5F5F5'
        >
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
