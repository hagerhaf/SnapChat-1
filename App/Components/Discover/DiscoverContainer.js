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

    this.getUserDOB = this.getUserDOB.bind(this)
    this.getDiscoverData = this.getDiscoverData.bind(this)
    this.toggleSpinner = this.toggleSpinner.bind(this)
    this.calculateAge = this.calculateAge.bind(this)
  }

  async componentDidMount () {
    this.toggleSpinner()
    await this.getUserDOB()
    await this.getDiscoverData().then((data) => {
      this.toggleSpinner()
      this.setState({ discoverData : data.articles })
    })
  }

  async getUserDOB () {
    try {
      const user = await AsyncStorage.getItem('user')
      this.setState({ userDOB: JSON.parse(user).birthday })
    } catch (error) {
      console.log('Error getting user object', error)
    }
  }

  toggleSpinner () {
    return this.setState({ loading: !this.state.loading })
  }

  getDiscoverData (DOB = this.state.userDOB) {
    const usersAge = this.calculateAge(DOB)
    if (usersAge < 25) {

      return fetch('https://newsapi.org/v1/articles?' +
      'source=buzzfeed&sortBy=top&apiKey=3be446bbf3c445ebbf8ea41f58cfaf93')
        .then((response) => response.json())
        .catch((error) => console.log('error retreiving discover data', error))
    }
    else if (usersAge >= 25 && usersAge <= 40) {

      return fetch('https://newsapi.org/v1/articles' +
      '?source=techcrunch&apiKey=3be446bbf3c445ebbf8ea41f58cfaf93')
        .then((response) => response.json())
        .catch((error) => console.log('error retreiving discover data', error))
    }

    return fetch('https://newsapi.org/v1/articles' +
    '?source=abc-news-au&sortBy=toph&apiKey=3be446bbf3c445ebbf8ea41f58cfaf93')
      .then((response) => response.json())
      .catch((error) => console.log('error retreiving discover data', error))
  }

  calculateAge (dateString) {
    const date = dateString.replace(/"/g, '')
    const birthday = new Date(date)
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
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
