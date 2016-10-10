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
    paddingLeft: 30,
    fontSize: 18,
    flex: .1,
    borderWidth: 9,
    borderColor: '#e4e4e4'
  }
})
