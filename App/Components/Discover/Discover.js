import React, { Component, PropTypes } from 'react'
import { View, ScrollView, WebView, TouchableOpacity, Text, Image, ActivityIndicator } from 'react-native'
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
    this.setState({ webViewUri: url })
  }

  onNavigationStateChange (navState) {
    this.setState({ canGoBack: navState.canGoBack })
  }

  onBack () {
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
              <View style={styles.backContainer}>
                <Image
                  source={require('../../../images/back_arrow.png')}
                  style={styles.backArrow}
                />
                <Text style={styles.backText}>
                  Back to Discover Articles
                </Text>
              </View>
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
        <View style={styles.discoverItems}>
          {this.props.loading && <ActivityIndicator animating size="large" style={{marginTop: 20}} />}
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

Discover.propTypes = {
  children: PropTypes.object,
  discoverData: PropTypes.array.isRequired
}

export default Discover
