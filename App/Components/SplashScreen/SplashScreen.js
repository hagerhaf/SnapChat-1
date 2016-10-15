import React from 'react'
import { View, Image } from 'react-native'
import { splashScreenStyles as styles } from './splashScreenStyles'

const SplashScreen = () => (
  <View style={styles.container}>
    <Image style={styles.splashImage}
           source={require('../../../images/logo_active.png')} />
  </View>
)

export default SplashScreen
