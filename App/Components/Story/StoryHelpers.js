import * as firebase from 'firebase'

export default function getFriends (cb) {
  const rootRef = firebase.database()
  const friendsRef = rootRef.ref('userObjects/friends/' + firebase.auth().currentUser.uid + '/list')
  friendsRef.on('child_added', function (snapshot) {
    cb(Object.assign(snapshot.val(), {key: snapshot.key}))
  })
}

export function getStory (friend, cb) {
  // db stuff
  const dbRef = firebase.database().ref().child('stories')

  const storageRef = firebase.storage().ref()
  const snapStoryRef = storageRef.child('stories').child(friend.key)
  
  // get each the stories for each friend
  dbRef.child(friend.key).on('child_added', (snapshot) => {
    Object.keys(snapshot.val()).forEach((key) => {
      let storyInfo = snapshot.val()[key]
      snapStoryRef.child(storyInfo.imageName).getDownloadURL().then(function (url) {
        cb({url, storyInfo})
      })
    })
  })
}
