const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const fs = require('fs');
const uuid = require('uuid-v4');

// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');
// Creates a client
const storage = new Storage({
  projectId: 'chat-7c887',
  keyFilename: 'chat-7c887-firebase-adminsdk.json',
});

exports.storeImage = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    console.log('req.body', req.body);

    // const body = JSON.parse(request.body);
    // console.log('body index ', body);

    // fs.writeFileSync('/tmp/uploaded-image.jpg', body.image, 'base64', err => {
    //   console.log('error to upload file', err);
    //   return response.status(500).json({error: err});
    // });

    // ///Make Storage Request
    // const bucket = storage.createBucket('chat-7c887.appspot.com');

    // bucket.upload(
    //   '/tmp/upload-image.jpg',
    //   {
    //     uploadType: 'media',
    //     destination: '/avatars/' + uuid() + '.jpg',
    //     metadata: {
    //       contentType: 'image/jpeg',
    //       firebaseStorageDownloadToken: uuid(),
    //     },
    //   },
    //   (err, file) => {
    //     if (!err) {
    //       response.status(201).json({
    //         imageUrl:
    //           'https://firebasestorage.googleapis.com/v0/b/' +
    //           bucket.name +
    //           '/o/' +
    //           encodeURIComponent(file.name) +
    //           '?alt=media&token=' +
    //           uuid(),
    //       });
    //     } else {
    //       console.log('Error :', err);
    //       response.status(500).json({error: err});
    //     }
    //   },
    // );
  });
});
