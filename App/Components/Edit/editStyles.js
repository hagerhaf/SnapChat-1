import { StyleSheet } from 'react-native'

export const editStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  header: {
    height: 60,
    top: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  headerButton: {
    color: 'white',
    fontSize: 16,
    width: 40,
    height: 30
  },
  flex: {
    flex: 1,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  triple: {
    flex: 2,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },
  textHidden: {
    height:  0,
    borderWidth:  0
  },
  textShown: {
    height: 40,
    textAlign: 'center',
    borderWidth: 1
  },
  sendIcon: {
    height: 35,
    width: 35,
    marginRight: 10,
    borderRadius: 15
  },
  icon: {
    height: 35,
    width: 35
  },
  backIcon: {
    height: 35,
    width: 35,
    marginLeft: 10
  },
  drawIcon: {
    height: 35,
    width: 35,
    marginRight: 10
  },
  textIcon: {
    height: 35,
    width: 35
  },
  timerIcon: {
    height: 35,
    width: 35,
    marginLeft: 10
  },
})
