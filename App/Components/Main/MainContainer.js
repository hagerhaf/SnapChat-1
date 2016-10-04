import React, { Component, PropTypes } from 'react'
import { NavigatorIOS } from 'react-native'
import SwipeableUI from './SwipeableUI'

class MainContainer extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <NavigatorIOS // Can potentially change this to just Navigator to customise the animation
        navigationBarHidden
        style={{flex: 1}}
        initialRoute={{component: SwipeableUI, title: 'SwipeableUI'}}
      />
    )
  }
}

MainContainer.propTypes = {
  navigator: PropTypes.object
}

export default MainContainer
