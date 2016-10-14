import * as firebase from 'firebase'

export default function uploadImageToFirebase (imageUri, fromUser, toUser) {
  console.log(imageUri)
  console.log(fromUser)
  console.log(toUser)

  let userFolderRef = firebase.storage().ref().child('userSnaps').child(fromUser)
  let snapRef = userFolderRef.child('unique_snap_id')

  snapRef.put().then(function (snapshot) {
    console.log('uploaded..')
  })
}


