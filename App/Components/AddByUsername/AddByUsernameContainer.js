import React, { Component, PropTypes } from 'react'
import { AsyncStorage } from 'react-native'
import AddByUsername from './AddByUsername'
import database from '../FireBase/FireBase'

class AddByUsernameContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: false,
      addSuccess: false,
      addFriendLoading: false,
      searchQuery: ''
    }

    this.searchUsername = this.searchUsername.bind(this)
    this.backButtonPressed = this.backButtonPressed.bind(this)
    this.submitRequest = this.submitRequest.bind(this)
    this.addFriendPressed = this.addFriendPressed.bind(this)
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

  async addFriendPressed (friend, friendId) {
    this.setState({ addFriendLoading: true })
    try {
      let userId = await AsyncStorage.getItem('userId')
      userId = userId.replace(/"/g, '')
      database.ref('userObjects')
              .child('friends')
              .child(userId)
              .child('list')
              .update({ [friendId]: friend }, (error) => {
                if (error) console.log('Error updating friends list', error)
                this.setState({ addFriendLoading : false, addSuccess: true })
              })

    } catch (error) {
      console.log('Error retreiving user Id', error)
    }
  }

  backButtonPressed () {
    this.props.navigator.pop()
  }

  render () {
    return (
      <AddByUsername searchUsername={this.searchUsername}
                     backButtonPressed={this.backButtonPressed}
                     submitRequest={this.submitRequest}
                     friendObject={this.state.queriedUser}
                     addFriendPressed={this.addFriendPressed}
                     addFriendLoading={this.state.addFriendLoading}
                     addSuccess={this.state.addSuccess}
                     loading={this.state.loading} />
    )
  }
}

AddByUsernameContainer.propTypes = {
    navigator: PropTypes.object.isRequired
}

export default AddByUsernameContainer
