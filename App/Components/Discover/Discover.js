import React, { Component, PropTypes } from 'react'
import { View, ScrollView, WebView, TouchableOpacity, Text } from 'react-native'
import { discoverStyles as styles } from './discoverStyles'
import DiscoverItem from './DiscoverItem'

class Discover extends Component {
  constructor (props) {
    super(props)

    this.state = {
      webViewUri: ''
    }

    this.createThumbRow = this.createThumbRow.bind(this)
    this.openWebView = this.openWebView.bind(this)
    this.onBack = this.onBack.bind(this)
  }

  openWebView (url) {
    console.log(url)
    this.setState({ webViewUri: url })
  }

  onNavigationStateChange (navState) {
    this.setState({ canGoBack: navState.canGoBack })
  }

  onBack () {
    console.log('pressed')
    this.setState({ webViewUri: '' })
  }

  createThumbRow (item, i) {
    return (
      <DiscoverItem
        key={i}
        title={item.title}
        image={item.urlToImage}
        open={this.openWebView}
        url={item.url}
      />
    )
  }

  render () {
    if (this.state.webViewUri.length > 0) {
      return (
        <View style={styles.webViewContainer}>
          <View style={styles.webViewTopBar}>
            <TouchableOpacity
              onPress={this.onBack}
              >
              <Text>Back to Discover</Text>
            </TouchableOpacity>
          </View>
          <WebView
            ref={(webWiew) => this.webWiew = webWiew}
            style={{flex: 1}}
            source={{uri: this.state.webViewUri}}
            onNavigationStateChange={this.onNavigationStateChange.bind(this)}
          />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        {this.props.children}
        <View style={styles.discoverItems}>
          <ScrollView
            showsVerticalScrollIndicator
            automaticallyAdjustContentInsets={false}
            horizontal={false}
          >
            {this.props.discoverData.map(this.createThumbRow)}
          </ScrollView>
        </View>
      </View>
    )
  }
}

//
// const Discover = ({ children, discoverData }) => (
//
// )
//
// const createThumbRow = (item, i) => (
//
// )

Discover.propTypes = {
  children: PropTypes.object,
  discoverData: PropTypes.array.isRequired
}

export default Discover
