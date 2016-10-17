import React, { Component, PropTypes } from 'react'
import { View, StatusBar } from 'react-native'
import Swiper from 'react-native-swiper'
import MeContainer from '../Me/MeContainer'
import StoriesContainer from '../Story/StoryContainer'
import ChatContainer from '../Chat/ChatContainer'
import MemoriesContainer from '../Memories/MemoriesContainer'
import CameraContainer from './CameraContainer'

class SwipeableUI extends Component {
  constructor (props) {
    super(props)

    this.mePressed = this.mePressed.bind(this)
    this.memoriesPressed = this.memoriesPressed.bind(this)
    this.chatPressed = this.chatPressed.bind(this)
    this.storiesPressed = this.storiesPressed.bind(this)
  }

  mePressed () {
    this.verticleSwiper.scrollBy(-1)
  }

  memoriesPressed () {
    this.verticleSwiper.scrollBy(1)
  }

  chatPressed () {
    this.horizontalSWiper.scrollBy(-1)
  }

  storiesPressed () {
    this.horizontalSWiper.scrollBy(1)
  }

  render () {
    return (
      <View>
        <StatusBar hidden />
        <Swiper showsPagination={false}
                ref={ref => this.horizontalSWiper = ref}
                loop={false}
                index={1} >

          {/* LEFT */}
          <ChatContainer navigator={this.props.navigator} />

          <Swiper horizontal={false}
                  ref={ref => this.verticleSwiper = ref}
                  loop={false}
                  showsPagination={false}
                  index={1}>

            {/* UP */}
            <MeContainer navigator={this.props.navigator} />

            {/* CENTER */}
            <CameraContainer navigator={this.props.navigator}
                             mePressed={this.mePressed}
                             memoriesPressed={this.memoriesPressed}
                             chatPressed={this.chatPressed}
                             storiesPressed={this.storiesPressed} />

            {/* DOWN */}
            <MemoriesContainer navigator={this.props.navigator} />
          </Swiper>

          {/* RIGHT */}
          <StoriesContainer navigator={this.props.navigator} />
        </Swiper>
      </View>
    )
  }
}

SwipeableUI.propTypes = {
  navigator: PropTypes.object.isRequired
}

export default SwipeableUI
