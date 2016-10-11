import React, { PropTypes } from 'react'
import { Text, View, TouchableHighlight, Image, TextInput } from 'react-native'
import { editStyles as styles } from './editStyles'

const Edit = ({
  backPressed,
  onSendPressed,
  onTextPressed,
  textVisible,
  uri,
  timer,
  onTimerValueChange
  }) => (
  // Render the image here.
  <Image source={{uri: uri}} style={styles.container}>

    {/* Top Navigation */}
    <View style={styles.header}>
      {/* Back button */}
      <View style={styles.flex}>
        <TouchableHighlight onPress={backPressed}>
          <Image source={require('../../../images/edit/back.png')} style={styles.backIcon}/>
        </TouchableHighlight>
      </View>
      <View style={styles.flex} />

      {/* Editing buttons */}
      <View style={styles.triple}>
        {/* Add sticker */}
        <TouchableHighlight>
          <Image source={require('../../../images/edit/emoticon.png')} style={styles.icon}/>
        </TouchableHighlight>

        {/* Add text */}
        <TouchableHighlight onPress={onTextPressed}>
          <Image source={require('../../../images/edit/text.png')} style={styles.textIcon}/>
        </TouchableHighlight>

        {/* Draw */}
        <TouchableHighlight>
          <Image source={require('../../../images/edit/draw.png')} style={styles.drawIcon}/>
        </TouchableHighlight>
      </View>
    </View>


    {/* Dependent on button click */}
    <TextInput
        style={textVisible ? styles.textShown : styles.textHidden}
    />

    {/* Bottom navigation */}
    <View style={styles.footer}>
      <View style={styles.header}>
        {/* Editing buttons */}
        <View style={styles.triple}>
          {/* Change time */}
          <TouchableHighlight>
            <Image source={require('../../../images/edit/timer-3.png')} style={styles.timerIcon}/>
          </TouchableHighlight>

          {/* Save snap */}
          <TouchableHighlight>
            <Image source={require('../../../images/edit/save.png')} style={styles.icon}/>
          </TouchableHighlight>

          {/* Add to story */}
          <TouchableHighlight>
            <Image source={require('../../../images/edit/add-to-story.png')} style={styles.icon}/>
          </TouchableHighlight>
        </View>

        {/* Send */}
        <View style={styles.flex} />
          <TouchableHighlight onPress={onSendPressed}>
            <Image source={require('../../../images/sendTo/sendArrow.png')} style={styles.sendIcon}/>
          </TouchableHighlight>
        </View>
    </View>
  </Image>
)

Edit.propTypes = {
  backPressed: PropTypes.func.isRequired,
  onSendPressed: PropTypes.func.isRequired,
  onTextPressed: PropTypes.func.isRequired,
  textVisible: PropTypes.bool.isRequired,
  uri: PropTypes.string.isRequired,
  timer: PropTypes.string.isRequired,
  onTimerValueChange: PropTypes.func.isRequired
}

export default Edit
