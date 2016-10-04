import React, { PropTypes } from 'react'
import { View, Text, Image, TouchableHighlight } from 'react-native'
import { meStyles as styles } from './meStyles'

const Me = ({
  addedMePressed,
  addFriendsPressed,
  myFriendsPressed,
  cameraBackPressed,
  trophyCasePressed,
  settingsPressed
}) => (
  <View style={styles.container}>
    {/* Header */}
    <View style={styles.header}>
      <TouchableHighlight>
        <Image
          source={require('../../../images/upload.png')}
          style={styles.uploadButton}
        />
      </TouchableHighlight>
      <TouchableHighlight style={styles.flex} onPress={trophyCasePressed}>
        <Image
          source={require('../../../images/trophy-icon.png')}
          style={styles.trophyButton}
        />
      </TouchableHighlight>
      <TouchableHighlight onPress={settingsPressed}>
        <Image
          source={require('../../../images/cog-icon.png')}
          style={styles.settingsButton}
        />
      </TouchableHighlight>
    </View>
    {/* Barcode Image */}
    <View style={styles.image}>
      <Image style={styles.barcodeImage} source={require('../../../images/barcodeImage.png')} />
      <Text style={styles.name}>
        Ryan O'Kane
      </Text>
      <Text style={styles.username}>
        ryanokane | 13,213
      </Text>
    </View>
    {/* Added Me Button */}
    <TouchableHighlight onPress={addedMePressed}>
      <View>
        <Text style={styles.buttonText}>
          Added Me
        </Text>
      </View>
    </TouchableHighlight>
    {/* Add Friends Button */}
    <TouchableHighlight onPress={addFriendsPressed}>
      <View>
        <Text style={styles.buttonText}>
          Add Friends
        </Text>
      </View>
    </TouchableHighlight>
    {/* My Friends Button */}
    <TouchableHighlight onPress={myFriendsPressed}>
      <View>
        <Text style={styles.buttonText}>
          My Friends
        </Text>
      </View>
    </TouchableHighlight>
    {/* Take Picture Button */}
    <TouchableHighlight onPress={cameraBackPressed}>
      <View style={styles.cameraButton}>
        <Text style={styles.buttonText}>
          O
        </Text>
      </View>
    </TouchableHighlight>
  </View>
)

const func = PropTypes.func.isRequired

Me.propTypes = {
  addedMePressed: func,
  cameraBackPressed: func,
  myFriendsPressed: func,
  addFriendsPressed: func,
  trophyCasePressed: func,
  settingsPressed: func
}

export default Me
