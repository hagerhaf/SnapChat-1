import React, { PropTypes } from 'react'
import { View, Text, TouchableHighlight, Image, ScrollView } from 'react-native'
import { settingsStyles as styles } from './settingsStyles'

const Settings = ({
  backButtonPressed,
  myAccountData,
  accountActionsData
}) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <TouchableHighlight onPress={backButtonPressed} underlayColor='#F5F5F5'>
        <Image style={styles.backArrow} source={require('../../../images/back_arrow.png')} />
      </TouchableHighlight>
      <Text style={styles.headerTitle}>
        Settings
      </Text>
      <Text style={styles.backArrow} />
    </View>
    <ScrollView>
      <Text style={styles.sectionTitle}>
        MY ACCOUNT
      </Text>
      {myAccountData.map((e, i) => createSectionRow(e, i))}
      <Text style={styles.sectionTitle}>
        ACCOUNT ACTIONS
      </Text>
      {accountActionsData.map((e, i) => createSectionRow(e, i))}
    </ScrollView>
  </View>
)

const SectionRow = ({field, func, val}) => {
  return (
    <View style={styles.listField}>
      <TouchableHighlight onPress={func} style={styles.left}>
        <Text>
          {field}
        </Text>
      </TouchableHighlight>
      <Text style={styles.right}>{val}</Text>
    </View>
  )
}

const createSectionRow = (settingsObject, i) => {
  return (
    <SectionRow key={i} field={settingsObject.field} func={settingsObject.func} val={settingsObject.val} />
  )
}

const func = PropTypes.func.isRequired

Settings.propTypes = {
  backButtonPressed: func,
  settingsData: PropTypes.array
}

export default Settings
