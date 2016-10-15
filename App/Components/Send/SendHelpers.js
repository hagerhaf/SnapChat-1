import * as firebase from 'firebase'
import RNFetchBlob from 'react-native-fetch-blob'

/* shit needed for sending */
const polyfill = RNFetchBlob.polyfill
window.XMLHttpRequest = polyfill.XMLHttpRequest
window.Blob = polyfill.Blob

export default function uploadImageToFirebase ({imageUri, timer}, fromUser, toUser) {
  return new Promise(function (resolve, reject) {
    /* db links */
    let dbUserRef = firebase.database().ref().child('snaps/' + toUser)

    /* storage stuff */
    var storageRef = firebase.storage().ref()
    let userFolderRef = storageRef.child('userSnaps').child(toUser)

    let path = imageUri
    let imageName = imageUri.match(/[^/.]+.jpg/)[0]
    Blob
        .build(RNFetchBlob.wrap(path), { type: 'image/jpeg' })
        .then((blob) => {
          return userFolderRef
                  .child(imageName)
                  .put(blob, { contentType: 'image/jpeg' })
        })
        .then((snapshot) => {
          let snapObject = {}
          snapObject[fromUser] = {}
          let imageNameUrl = imageName.replace('.jpg', '')
          snapObject[fromUser][imageNameUrl] = {
            timer: timer,
            from: fromUser,
            imageName: imageName
          }
          return dbUserRef.push(snapObject)
        })
         .then(() => resolve('success'))
        .catch((err) => { reject(err) })
  })
}

export function saveToStory ({imageUri, timer}) {
  return new Promise(function (resolve, reject) {
    let currentUid = firebase.auth().currentUser.uid
    // db ref
    let dbSnapStoryRef = firebase.database().ref().child('stories')

    // Create a storage reference
    var storageRef = firebase.storage().ref()
    var snapStoryRef = storageRef.child('stories').child(currentUid)

    let path = imageUri
    let imageName = imageUri.match(/[^/.]+.jpg/)[0]
    Blob.build(RNFetchBlob.wrap(path), { type: 'image/jpeg' })
        .then((blob) => snapStoryRef
                .child(imageName)
                .put(blob, { contentType: 'image/jpeg' })
        )
        .then((snapshot) => {
          let snapObject = {}
          snapObject[currentUid] = {}
          let imageNameUrl = imageName.replace('.jpg', '')
          snapObject[currentUid][imageNameUrl] = {
            timer,
            date: Date.now(),
            imageName
          }
          return dbSnapStoryRef.push(snapObject)
        })
        .then((snapshot) => { resolve('success') })
        .catch((err) => { reject(err) })
  })
}
