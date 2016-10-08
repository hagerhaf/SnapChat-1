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
    padding: 13,
    flexDirection: 'row'
  },
  title: {
    fontFamily: 'Avenir-Heavy',
    alignSelf: 'center',
    color: 'white',
    fontSize: 20
  },
  titleBottom: {
    // alignSelf: 'flex-start'
  },
  listToSend: {
    flex: 1
  },
  lastRecieved: {
    fontSize: 10,
    paddingTop: 3
  },
  imageIcon: {
    height: 30,
    width: 30
  },
  imageStatus: {
    height: 27,
    width: 27
  },
  ImagePosition: {
    // marginLeft: 'Auto'
    marginRight: 10
  },
  userRow: {
    padding: 10,
    paddingLeft: 18,
    flex: 1,
    flexDirection: 'row'
  },
  userRowHighlighted: {
    padding: 10,
    paddingLeft: 18,
    flexDirection: 'row',
    backgroundColor: '#e7e7e7'
  },
  highlighted: {
    fontWeight: 'bold',
    paddingTop: 5,
    fontSize: 18,
    flex: 1
  },
  nonHighlighted: {
    flex: 1,
    paddingTop: 5,
    fontSize: 18
  },
  seperator: {
    height: 0.25,
    backgroundColor: '#e7e7e7'
  }
})
