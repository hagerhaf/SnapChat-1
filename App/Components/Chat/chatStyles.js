import { StyleSheet } from 'react-native'

export const touchColor = '#F1F0EF'
export const chatStyles = StyleSheet.create({
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

export const chatToUserStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  content: {
    flex: 1
  },
  textInput: {
    height: 40,
    margin: 0,
    paddingLeft: 5
  },
  textInputBorder: {
    borderTopColor: '#F0F0F0',
    borderTopWidth: 1
  },
  messages: {
    flex: 1,
    padding: 10
  },
  sentMessageContainer: {
    flex: 1,
    alignSelf: 'stretch'
  },
  receivedMessageContainer: {
    flex: 1,
    alignSelf: 'stretch'
  },
  messageMe: {
    color: 'red',
    alignSelf: 'flex-start'
  },
  messageThem: {
    fontSize: 16,
    margin: 3,
    color: '#3c5fe2',
    alignSelf: 'flex-end',
    fontFamily: 'Avenir-Heavy'
  },
  messageNormal: {
    color: '#e26c3c',
    fontSize: 16,
    margin: 3,
    fontFamily: 'Avenir-Heavy'
  },
  chatToUserToolBar: {
    backgroundColor: 'white',
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  chatToUserToolBarButton: {
    width: 50,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'red',
    fontSize: 18,
    marginRight: 5,
    fontFamily: 'Avenir'
  },
  chatToUserToolBarTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#3cb2e2',
    fontSize: 20
  },
  sendButton: {
    fontSize: 30,
    paddingRight: 10
  },
  sendToolBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingTop: 0
  },
  toolBarImage: {
    height: 30,
    width: 30
  }
})
