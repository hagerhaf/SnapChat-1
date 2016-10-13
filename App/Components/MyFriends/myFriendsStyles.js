import { StyleSheet } from 'react-native'

export const myFriendsStyles = StyleSheet.create({
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
  imageIcon: {
    height: 30,
    width: 30
  },
  ImagePosition: {
    // marginLeft: 'Auto'
    marginLeft: 0,
    paddingRight: 20
  },
  friendImage: {
    height: 30,
    width: 30,
    marginLeft: 0,
    paddingRight: 0
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
  subHeading: {
    color: '#944E9C',
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 15,
    marginTop: 10,
    paddingBottom: 5
  },
  addText: {
    color: '#944E9C',
    fontSize: 16,
    textAlign: 'center',
    flex: 1,
    padding: 5
  },
  username: {
    fontSize: 16,
    paddingBottom: 5
  },
  method: {
    fontSize: 10
  },
  userRowInfo: {
    flexDirection: 'row',
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 1,
    padding: 15,
    marginLeft: 5
  },
  userNameField: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: 25
  },
  addButton: {
    borderWidth: 2,
    borderColor: '#e8e8e8',
    marginRight: 5,
    padding: 5
  },
  addText: {
    color: '#944E9C',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 2
  },
  addButtonLocation: {
    flex: 1
  }
})
