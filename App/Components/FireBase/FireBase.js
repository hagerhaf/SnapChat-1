import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyA1ibIJsCQv8KBNMhg5D91PvuYI3QM5viU',
  authDomain: 'snapchat-da2b5.firebaseapp.com',
  databaseURL: 'https://snapchat-da2b5.firebaseio.com',
  storageBucket: 'snapchat-da2b5.appspot.com',
  messagingSenderId: '927676989151'
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const authentication = firebase.auth()
const database = firebaseApp.database()

export default database
export {authentication}

function getSnapsCurrentUser (cb) {
  console.log('getSnap')
  const snapRef = firebase.database().ref().child('snaps').child(firebase.auth().currentUser.uid)

  snapRef.on('child_changed', (snapshot) => {
    cb(snapshot.val())
  })
}

function getDownloadUrl (snap, cb) {
  const downloadRef = firebase.storage().ref().child('userSnaps').child(firebase.auth().currentUser.uid)

  const fromUser = Object.keys(snap)[0]
  const key = Object.keys(snap[fromUser])[0]
  const snapObject = snap[fromUser][key]

  downloadRef.child(snapObject.imageName).getDownloadURL().then(function (url) {
    cb(Object.assign({url: url}, {storyInfo: snapObject, fromUser: fromUser}))
  })
}

function deleteSnap (snap, cb) {
  console.log('deleteSnap', snap)
  const snapRef = firebase.database().ref().child('snaps').child(firebase.auth().currentUser.uid)

  let snapshots = []
  snapRef.on('child_added', (snapshot) => {
    if (snap.fromUser === Object.keys(snapshot.val())[0]) {
      snapshots.push({key: snapshot.key, val: snapshot.val()})
    }
  })
  console.log(snapshots)
  snapshots.forEach((snapshot) => {
    snapRef.child(snapshot.key).remove((err) => {
      if (err) cb(err)
      else cb(null)
    })
  })
}

export {getSnapsCurrentUser}
export {getDownloadUrl}
export {deleteSnap}
