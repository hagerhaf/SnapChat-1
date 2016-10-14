import React, { Component, PropTypes } from 'react'
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
    // How I plan it will work is to search for matches in the database with each key press
    // and display results in a list if they exist, or none if it doesn't
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
