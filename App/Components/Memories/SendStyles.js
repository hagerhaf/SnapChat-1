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
  headingColorError: {
    backgroundColor: 'rgb(253,109,109)'
  },
  headingColorSuccess: {
    backgroundColor: 'rgb(90,253,111)'
  },
  headingBottom: {
    padding: 9
  },
  subHeading: {
    color: '#3cb2e2',
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 10
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
    flex: 1,
    padding: 10
  },
  displayFriends: {
    color: 'white',
    fontWeight: 'bold'
  },
  lastRecieved: {
    fontSize: 10,
    paddingTop: 3
  },
  imageIcon: {
    height: 30,
    width: 30
  },
  imageIconSend: {
    height: 35,
    width: 35
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
