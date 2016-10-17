import React, { Component, PropTypes } from 'react'
import ViewSnap from './ViewSnap'
import ReactTimeout from 'react-timeout'

class ViewImage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      snapCount: 0,
      timer: parseInt(this.props.stories[0].storyInfo.timer)
    }

    this.back = this.back.bind(this)
    this.countDown = this.countDown.bind(this)
  }

  back () {
    this.props.navigator.pop()
  }

  countDown () {
    if (this.state.snapCount < this.props.stories.length) {
      this.props.setTimeout(() => {
        if (this.state.timer - 1 < 0) {
          if (this.state.snapCount + 1 === this.props.stories.length) { return this.back() }

          this.setState({
            snapCount: this.state.snapCount += 1,
            timer: parseInt(this.props.stories[this.state.snapCount].storyInfo.timer)
          })
        } else {
          this.setState({
            timer: this.state.timer -= 1
          })
        }
      }, 999)
    } else {
      this.back()
    }
  }

  componentDidMount () {
    this.countDown()
  }

  componentWillUpdate () {
    this.countDown()
  }

  render () {
    let currentStory = this.props.stories[this.state.snapCount]

    return (
      <ViewSnap url={currentStory.url}
                onBackPressed={this.back}
                countDown={this.state.timer} />
    )
  }
}

export default ReactTimeout(ViewImage)

ViewImage.propTypes = {
  navigator: PropTypes.object.isRequired
}
