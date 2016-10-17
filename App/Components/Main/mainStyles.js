import { StyleSheet, Dimensions } from 'react-native'

export const mainStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  active:{
    color:'indianred'
  },
  header: {
    height: 60,
    top: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  flashIcon: {
    height: 30,
    width: 30,
    marginLeft: 10
  },
  ghostIcon: {
    height: 25,
    width: 25
  },
  selfieIcon: {
    height: 35,
    width: 35,
    marginRight: 10
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20
  },
  flex: {
    flex: 1
  },
  preview: {
    flex: 1,
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40,
    textAlign: 'center'
  },
  chatIcon: {
    height: 30,
    width: 30,
    marginLeft: 15,
  },
  numSnaps: {
    color: 'white',
    fontFamily: 'Avenir-Book',
    fontSize: 24,
    marginLeft: 22
  },
  captureIcon: {
    height: 75,
    width: 75,
    marginBottom: 15,
    alignSelf: 'center'
  },
  memoriesIcon: {
    height: 25,
    width: 25,
    marginTop: -5,
    alignSelf: 'center'
  },
  storiesIcon: {
    height: 30,
    width: 30,
    marginRight: 10
  }
})
