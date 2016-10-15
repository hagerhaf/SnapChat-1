import * as firebase from 'firebase'
import RNFetchBlob from 'react-native-fetch-blob'

/* shit needed for sending */
const polyfill = RNFetchBlob.polyfill
window.XMLHttpRequest = polyfill.XMLHttpRequest
window.Blob = polyfill.Blob

export default function uploadImageToFirebase (imageUri, fromUser, toUser) {
  return new Promise(function (resolve, reject) {
    // Create a root reference
    var storageRef = firebase.storage().ref()

    // Create a reference to users folder
    let userFolderRef = storageRef.child('userSnaps').child(toUser)

    let path = imageUri
    let imageName = imageUri.match(/[^/.]+.jpg/)[0]
    Blob.build(RNFetchBlob.wrap(path), { type: 'image/jpeg' })
        .then((blob) => userFolderRef
                .child(imageName)
                .put(blob, { contentType: 'image/jpeg' })
        )
        .then((snapshot) => { resolve(snapshot) })
        .catch((err) => { reject(err) })
  })
}

export function saveToStory (imageUri) {
  return new Promise(function (resolve, reject) {
    // Create a root reference
    var storageRef = firebase.storage().ref()
    var snapStoryRef = storageRef.child('stories').child(firebase.auth().currentUser.uid)

    let path = imageUri
    let imageName = imageUri.match(/[^/.]+.jpg/)[0]
    Blob.build(RNFetchBlob.wrap(path), { type: 'image/jpeg' })
        .then((blob) => snapStoryRef
                .child(imageName)
                .put(blob, { contentType: 'image/jpeg' })
        )
        .then((snapshot) => { resolve(snapshot) })
        .catch((err) => { reject(err) })
  })
}
