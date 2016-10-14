import { StyleSheet } from 'react-native'

export const AddByUsernameStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        marginTop: 30,
        paddingBottom: 10,
        flexDirection: 'row',
        borderBottomColor: '#e8e8e8',
        borderBottomWidth: 1
    },
    backArrow: {
        width: 30,
        height: 30
    },
    headerTitle: {
        color: '#944E9C',
        fontSize: 22,
        textAlign: 'center',
        flex: 1
    },
    searchBar: {
        paddingLeft: 15,
        fontSize: 18,
        height: 44,
        flex: 1
    },
    searchBox: {
        borderBottomColor: '#e8e8e8',
        borderBottomWidth: 1,
        flexDirection: 'row'
    },
    searchIcon: {
        height: 30,
        width: 30,
        marginLeft: 15,
        marginTop: 7
    },
    friendIcon: {
      height: 45,
      width: 45,
      marginTop: 10
    },
    addFriendContainer: {
      alignSelf: 'center',
      marginTop: 30,
      padding: 20,
      borderColor: 'silver',
      borderWidth: 1
    },
    addFriendDetails: {
      flexDirection: 'row'
    },
    addFriendText: {
      fontSize: 18,
      margin: 8,
      fontFamily: 'Avenir-Medium'
    },
    addFriendButtonContainer: {
      alignSelf: 'center',
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
      height: 20,
      width: 120,
      borderRadius: 30,
      backgroundColor: 'purple',
      padding: 23
    },
    addFriendButton: {
      color: 'white',
      fontFamily: 'Avenir-Medium',
      fontSize: 14
    }
})
