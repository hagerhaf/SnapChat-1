import React, { PropTypes } from 'react'
import { Text, View, TouchableHighlight, Image, TextInput, TouchableOpacity } from 'react-native'
// import Sketch from 'react-native-sketch'
import Sketch from 'react-native-sketch'
import { editStyles as styles } from './editStyles'
import Spinner from 'react-native-loading-spinner-overlay'
import Picker from 'react-native-wheel-picker'
const PickerItem = Picker.Item

const Edit = ({
  backPressed,
  onSendPressed,
  onTextPressed,
  textVisible,
  uri,
  timer,
  onTimerValueChange,
  onReset,
  onUpdate,
  onSave,
  onPressedSaveToStory,
  onStorySaving,
  storySaved,
  timerEdit,
  onTimerEditPressed
  }) => {
  // Render the image here.

  function saveToStoryButton (storySaved) {
    if (storySaved) { return <View /> }
    else {
      return (<TouchableOpacity onPress={() => onPressedSaveToStory(uri, timer)}>
        <Image source={require('../../../images/edit/add-to-story.png')} style={styles.icon} />
      </TouchableOpacity>
        )
    }
  }

  function displayEditTimerImage (timer) {
    var image
    switch (timer) {
      case 1:
        image = (<Image source={require('../../../images/edit/timer-1.png')} style={styles.timerIcon} />)
        break
      case 2:
        image = (<Image source={require('../../../images/edit/timer-2.png')} style={styles.timerIcon} />)
        break
      case 3:
        image = (<Image source={require('../../../images/edit/timer-3.png')} style={styles.timerIcon} />)
        break
      case 4:
        image = (<Image source={require('../../../images/edit/timer-4.png')} style={styles.timerIcon} />)
        break
      case 5:
        image = (<Image source={require('../../../images/edit/timer-5.png')} style={styles.timerIcon} />)
        break
      case 6:
        image = (<Image source={require('../../../images/edit/timer-6.png')} style={styles.timerIcon} />)
        break
      case 7:
        image = (<Image source={require('../../../images/edit/timer-7.png')} style={styles.timerIcon} />)
        break
      case 8:
        image = (<Image source={require('../../../images/edit/timer-8.png')} style={styles.timerIcon} />)
        break
      case 9:
        image = (<Image source={require('../../../images/edit/timer-9.png')} style={styles.timerIcon} />)
        break
      default:
        image = (<Image source={require('../../../images/edit/timer-3.png')} style={styles.timerIcon} />)
    }
    return (
      <TouchableOpacity onPress={onTimerEditPressed}>
        {image}
      </TouchableOpacity>
    )
  }

  function displayPicker (isPicking) {
    if(isPicking){
      return (
        <Picker style={{flex: 1}}
        selectedValue={timer}
        itemStyle={{color: 'white', fontSize: 26}}
        onValueChange={(index) => onTimerValueChange(index)}>
        {'123456789'.split('').map((value, i) => {
          return <PickerItem label={value} value={i + 1} key={'timer' + value} />
        })}
      </Picker>
      )
    }
  }

  return (<Image source={{uri: uri}} style={styles.container}>
    <Spinner visible={onStorySaving} />
    {/* Top Navigation */}
    <View style={styles.header}>
      {/* Back button */}
      <View style={styles.flex}>
        <TouchableOpacity onPress={backPressed}>
          <Image source={require('../../../images/edit/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.flex} />

      {/* Editing buttons */}
      <View style={styles.triple}>
        {/* Add sticker */}

        <TouchableOpacity>
          <Image source={require('../../../images/edit/emoticon.png')} style={styles.icon} />
        </TouchableOpacity>

        {/* Add text */}
        <TouchableOpacity onPress={onTextPressed}>
          <Image source={require('../../../images/edit/text.png')} style={styles.textIcon} />
        </TouchableOpacity>

        {/* Draw */}
        <TouchableOpacity>
          <Image source={require('../../../images/edit/draw.png')} style={styles.drawIcon} />
        </TouchableOpacity>
      </View>
    </View>

    {/* Dependent on button click */}
    <TextInput
      style={textVisible ? styles.textShown : styles.textHidden}
    />

    {/* <Sketch*/}
    {/* resizeMode="contain"*/}
    {/* strokeColor="#111111"*/}
    {/* strokeThickness={2}*/}
    {/* onReset={onReset}*/}
    {/* onUpdate={onUpdate}*/}
    {/* ref={(sketch) => { this.sketch = sketch; }}*/}
    {/* style={styles.sketch}*/}
    {/* />*/}

    {/* Bottom navigation */}
    <View style={styles.footer}>
      {displayPicker(timerEdit)}
      
      <View style={styles.header}>
        {/* Editing buttons */}
        <View style={styles.triple}>

          {/* Change time */}
          {displayEditTimerImage(timer)}

          {/* Save snap */}
          <TouchableOpacity onPress={onSave}>
            <Image source={require('../../../images/edit/save.png')} style={styles.icon} />
          </TouchableOpacity>

          {/* Add to story */}
          {saveToStoryButton(storySaved)}

        </View>

        {/* Send */}
        <View style={styles.flex} />

        <TouchableOpacity onPress={() => onSendPressed(uri)}>
          <Image source={require('../../../images/sendTo/sendArrow.png')} style={styles.sendIcon} />
        </TouchableOpacity>
      </View>
    </View>
  </Image>
    )
}

Edit.propTypes = {
  backPressed: PropTypes.func.isRequired,
  onSendPressed: PropTypes.func.isRequired,
  onTextPressed: PropTypes.func.isRequired,
  textVisible: PropTypes.bool.isRequired,
  uri: PropTypes.string.isRequired,
  timer: PropTypes.number.isRequired,
  onTimerValueChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onPressedSaveToStory: PropTypes.func.isRequired,
  onStorySaving: PropTypes.bool.isRequired,
  storySaved: PropTypes.bool.isRequired,
  onTimerEditPressed: PropTypes.func.isRequired,
  timerEdit: PropTypes.bool.isRequired
}

export default Edit

