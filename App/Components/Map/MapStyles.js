import { StyleSheet } from 'react-native'

export const mapStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  heading: {
    fontFamily: 'Avenir-Heavy',
    color: 'purple',
    fontSize: 20,
    padding: 10
  },
  subheading: {
    fontFamily: 'Avenir-Heavy',
    textAlign: 'center',
    color: 'purple',
    borderBottomWidth: 1,
    borderBottomColor: 'purple',
    marginBottom: 10
  },
  storyRow: {
    flexDirection: 'row',
    padding: 5,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1
  },
  storyIcon: {
    height: 30,
    width: 48,
    padding: 3,
    paddingTop: 6,
    paddingLeft: 6
  },
  usernameHeading: {
    fontSize: 16,
    fontFamily: 'Avenir-Medium'
  },
  agoSubHeading: {
    fontSize: 12,
    color: 'grey',
    fontFamily: 'Avenir-Light'
  }
})
