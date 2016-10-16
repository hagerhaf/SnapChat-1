import { StyleSheet } from 'react-native'

export const touchColor = '#F1F0EF'
export const viewStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#3cb2e2'
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
    flexDirection: 'row',
    alignSelf: 'center'
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
    textAlign: 'center',
    color: 'white',
    fontSize: 20
  },
  image: {
    width: 120, height: 120
  }

})
