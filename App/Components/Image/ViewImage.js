import React, {Component, PropTypes} from 'react'
import {Image, View} from 'react-native'
import ViewSnap from './ViewSnap'
import Stories from '../Story/StoryContainer'
import ReactTimeout from 'react-timeout'

class ViewImage extends Component {
  constructor (props) {
    super(props)
    // keeps a count on what snap we are on
    this.state = {
      snapCount: 0
    }

    this.back = this.back.bind(this)
    this.changePicture = this.changePicture.bind(this)
  }

  back () {
    this.props.navigator.pop()
  }

  changePicture () {
    this.props.setTimeout(() => {
      console.log('timeout', this.state.snapCount, this.props.stories.length)

      if (this.state.snapCount + 1 < this.props.stories.length) {
        this.setState({snapCount: this.state.snapCount += 1})
      } else {
        console.log('doe shtis urn');
        () => this.props.navigator.pop()
      }
    }, 2)
  }

  render () {
    console.log(this.props)

    let currentStory = this.props.stories[this.state.snapCount]
    this.changePicture()
    return (
      <ViewSnap url={currentStory.url} onBackPressed={this.back} />
    )
  }
}

export default ReactTimeout(ViewImage)

ViewImage.propTypes = {
  navigator: PropTypes.object.isRequired
}
