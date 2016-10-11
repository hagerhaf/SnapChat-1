import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import Discover from './Discover'
import Spinner from 'react-native-loading-spinner-overlay'
import * as firebase from 'firebase'

class DiscoverContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      discoverData: [],
      loading: false
    }

    this.getUser = this.getUser.bind(this)
    this.getDiscoverData = this.getDiscoverData.bind(this)
    this.toggleSpinner = this.toggleSpinner.bind(this)
  }

  componentDidMount () {
    this.toggleSpinner()
    this.getUser()
  }

  // suuupper retarded way of getting the user with additional attributes, not sure how to query FB properly FB docs are confusing lol
  async getUser () {
    try {
      const user = await AsyncStorage.getItem('user')
      const userId = await AsyncStorage.getItem('userId')
      const { email } = JSON.parse(user)

      const ref = firebase.database().ref('users')
      ref.once('value')
        .then(function(snapshot) {
          const users = snapshot.val()

          for (let userKey in users) {
            if (users[userKey].username.toLowerCase() === email) {
              // set state doesnt work here of course, need to find another way
              this.setState({ usersBirthday: users[userKey].birthday }, () => console.log(this.state))
            }
          }

          this.getDiscoverData()
            .then((data) => {
              this.setState({ discoverData: data.articles })
              this.toggleSpinner()
            })
            .catch((error) => {
              this.toggleSpinner()
              console.log(error)
            })
        })

    } catch (error) {
      console.log('Error getting user object', error)
    }

  }

  toggleSpinner () {
    return this.setState({ loading: !this.state.loading })
  }

  getDiscoverData () {
    return fetch('https://newsapi.org/v1/articles' +
    '?source=techcrunch&apiKey=3be446bbf3c445ebbf8ea41f58cfaf93')
      .then((response) => response.json())
  }

  render () {
    const spinner = this.state.loading
      ? <Spinner visible overlayColor={'rgba(0,0,0,0.70)'} />
      : null
    return (
      <Discover discoverData={this.state.discoverData}>
        {spinner}
      </Discover>
    )
  }
}

export default DiscoverContainer
