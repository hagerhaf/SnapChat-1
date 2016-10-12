import React, { Component, PropTypes } from 'react'
import {View, Text, ListView} from 'react-native'
import AddByUsername from './AddByUsername'

class AddByUsernameContainer extends Component {

    constructor (props) {
        super(props)

        this.state = {
        }

        this.searchUsername = this.searchUsername.bind(this)
        this.backButtonPressed = this.backButtonPressed.bind(this)
    }


    // Call to data source to occur here
    searchUsername (event) {

    }

    backButtonPressed () {
        this.props.navigator.pop()
    }

    render () {
        return (
            <AddByUsername
                searchUsername={this.searchUsername}
                backButtonPressed={this.backButtonPressed}
            />
        )
    }

}

AddByUsernameContainer.propTypes = {
    navigator: PropTypes.object.isRequired
}

export default AddByUsernameContainer
