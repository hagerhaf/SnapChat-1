import React, { Component, PropTypes } from 'react'
import AddByUsername from './AddByUsername'
import database from '../FireBase/FireBase'


class AddByUsernameContainer extends Component {
  constructor (props) {
      super(props)

      this.state = {
        loading: false,
        searchQuery: ''
      }

      this.searchUsername = this.searchUsername.bind(this)
      this.backButtonPressed = this.backButtonPressed.bind(this)
      this.submitRequest = this.submitRequest.bind(this)
  }

  searchUsername (queryString) {
    this.setState({ searchQuery: queryString })
  }

  submitRequest () {
    const self = this
    this.setState({ loading: true })
    database.ref('users')
      .orderByChild('username')
      .equalTo(this.state.searchQuery)
      .once('value', (snapshot) => {
        self.setState({
          loading: false,
          queriedUser: snapshot.val()
        })
      })
  }

  backButtonPressed () {
    this.props.navigator.pop()
    const friendsRef = database.ref('users').once
  }

  render () {
    return (
      <AddByUsername
          searchUsername={this.searchUsername}
          backButtonPressed={this.backButtonPressed}
          submitRequest={this.submitRequest}
          friendObject={this.state.queriedUser}
          loading={this.state.loading}
      />
    )
  }
}

AddByUsernameContainer.propTypes = {
    navigator: PropTypes.object.isRequired
}

export default AddByUsernameContainer
