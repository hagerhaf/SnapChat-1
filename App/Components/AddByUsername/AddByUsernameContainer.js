import React, { Component, PropTypes } from 'react'
import {View, Text, ListView} from 'react-native'
import AddByUsername from './AddByUsername'

class AddByUsernameContainer extends Component {

    constructor (props) {
        super(props)

        this.state = {
        }

        this.backButtonPressed = this.backButtonPressed.bind(this)
        this.searchUsername = this.searchUsername.bind(this)
    }

    backButtonPressed () {
        this.props.navigator.pop()
    }

    // Call to data source to occur here
    searchUsername (event) {

    }

    render () {
        return (
            <AddByUsername
                backButtonPressed={this.backButtonPressed}
                searchUsername={this.searchUsername}
            />
        )
    }

}

export default AddByUsernameContainer
