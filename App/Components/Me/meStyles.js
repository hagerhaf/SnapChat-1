import { StyleSheet } from 'react-native'

export const meStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f'
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    letterSpacing: 1,
    alignSelf: 'stretch',
    fontWeight: 'bold',
    fontFamily: 'Avenir-Heavy',
    padding: 10
  },
  header: {
    marginTop: 30,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  image: {
    padding: 20
  },
  barcodeImage: {
    alignSelf: 'center',
    width: 150,
    height: 150
  },
  name: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Avenir-Medium',
  },
  username: {
    fontSize: 10,
    textAlign: 'center',
    color: 'white',
    paddingBottom: 20,
    fontFamily: 'Avenir-Medium'
  },
  headerButton: {
    color: 'white',
    fontSize: 16,
    width: 40,
    height: 30,
    fontFamily: 'Avenir-Medium'
  },
  headerMiddle: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    flex: 1,
    fontFamily: 'Avenir-Medium'
  },
  flex: {
    flex: 1
  },
  uploadButton: {
    height: 20,
    width: 20,
    marginLeft: 20
  },
  trophyButton: {
    height: 45,
    width: 45,
    marginTop: -12,
    marginBottom: 35,
    alignSelf: 'center'
  },
  settingsButton: {
    height: 25,
    width: 25,
    marginRight: 20
  }
})
