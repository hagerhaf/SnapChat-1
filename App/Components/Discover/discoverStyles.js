import { StyleSheet } from 'react-native'

export const discoverStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  discoverItems: {
    flex: 1,
    height: 780,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop: 20
  },
  discoverItem: {
    backgroundColor: 'white',
    width: 310,
    height: 260,
    alignSelf: 'stretch',
    padding: 15,
    margin: 5,
    borderColor: '#EEEEEE',
    borderWidth: 1
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Avenir-Medium'
  },
  itemImage: {
    width: 200,
    height: 150,
    alignSelf: 'center',
    marginTop: 10
  },
  webViewContainer: {
    flex: 1,
    paddingTop: 15
  },
  webViewTopBar: {
    height: 35,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  backArrow: {
    height: 20,
    width: 20
  },
  backText: {
    fontWeight: 'bold',
    fontFamily: 'Avenir-Medium',
    color: 'purple'
  }
})
