import { StyleSheet } from 'react-native'

export const touchColor = '#F1F0EF'
export const sendStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  chatText: {
    fontFamily: 'Avenir-Medium'
  },
  content: {
    flex: 1
  },
  heading: {
    backgroundColor: '#3cb2e2',
    padding: 13
  },
  title: {
    fontFamily: 'Avenir-Heavy',
    alignSelf: 'center',
    color: 'white',
    fontSize: 20
  },
  lastRecieved: {
    fontSize: 10,
    paddingTop: 3
  },
  imageIcon: {
    height: 30,
    width: 48,
    paddingLeft: 3,
    paddingTop: 3
  },
  imageStatus: {
    height: 27,
    width: 27
  },
  userRow: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: 'rgb(176, 174, 172)',
    borderBottomWidth: 0.23
  },
  userRowInfo: {
    flexDirection: 'column'
  }
})