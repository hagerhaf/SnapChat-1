import React, {Component} from 'react'
import Discover from './Discover'
import Spinner from 'react-native-loading-spinner-overlay'

class DiscoverContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      discoverData: [],
      loading: false
    }

    this.getDiscoverData = this.getDiscoverData.bind(this)
    this.toggleSpinner = this.toggleSpinner.bind(this)
  }

  componentDidMount () {
    this.getDiscoverData()
      .then((data) => {
        this.setState({ discoverData: data.articles })
        this.toggleSpinner()
      })
      .catch((error) => {
        this.toggleSpinner()
        console.log(error)
      })
  }

  toggleSpinner () {
    return this.setState({ loading: !this.state.loading })
  }

  getDiscoverData () {
    this.toggleSpinner()
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
