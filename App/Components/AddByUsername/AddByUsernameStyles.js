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
    }
})