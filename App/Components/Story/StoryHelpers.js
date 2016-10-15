import * as firebase from 'firebase'

export default function getUsers (cb) {
  const rootRef = firebase.database()
  const friendsRef = rootRef.ref('userObjects/friends/' + firebase.auth().currentUser.uid + '/list')
  friendsRef.on('child_added', function (snapshot) {
    cb(Object.assign(snapshot.val(), {key: snapshot.key}))
  })
}

export function getStory (user, cb) {
  const storageRef = firebase.storage().ref()
  const snapStoryRef = storageRef.child('stories').child(user.key + '/')

  // see if they have any snaps

  snapStoryRef.getDownloadURL().then(function (url) {
    cb(null, url)
    console.log(url)
  })
  .catch((err) => {
    cb(err)
    console.log(err)
  })

  // return
}
