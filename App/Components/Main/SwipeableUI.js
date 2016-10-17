import React, { PropTypes } from 'react'
import { View, StatusBar } from 'react-native'
import Swiper from 'react-native-swiper'
import MeContainer from '../Me/MeContainer'
import StoriesContainer from '../Story/StoryContainer'
import ChatContainer from '../Chat/ChatContainer'
import MemoriesContainer from '../Memories/MemoriesContainer'
import CameraContainer from './CameraContainer'

const SwipeableUI = ({
  navigator
}) => (
  <View>
    <StatusBar hidden />
    <Swiper
      showsPagination={false}
      loop={false}
      index={1}
    >
      {/* LEFT */}
      <ChatContainer navigator={navigator} />
      <Swiper
        horizontal={false}
        loop={false}
        showsPagination={false}
        index={1}
      >
        {/* UP */}
        <MeContainer navigator={navigator} />
        {/* CENTER */}
        <CameraContainer navigator={navigator} />
        {/* DOWN */}
        <MemoriesContainer navigator={navigator} />
      </Swiper>
      {/* RIGHT */}
      <StoriesContainer navigator={navigator} />
    </Swiper>
  </View>
)

SwipeableUI.propTypes = {
  navigator: PropTypes.object.isRequired
}

export default SwipeableUI
