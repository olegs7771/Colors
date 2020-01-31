const functions = require('firebase-functions');
const fs = require('fs');
const uuid = require('uuid-v4');
const Busboy = require('busboy');
const path = require('path');
const os = require('os');
const cors = require('cors')({origin: true});

// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// Creates a client
const storage = new Storage({
  projectId: 'chat-7c887',
  keyFilename: 'chat-7c887-firebase-adminsdk.json',
});

exports.storeImage = functions.https.onRequest((req, res) => {
  // console.log('req.body', req.body);

  cors(req, res, () => {
    if (req.method !== 'POST') {
      return res.status(500).json({message: 'Not allowed!'});
    }

    const busboy = new Busboy({headers: req.headers});
    let uploadData = null;
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      const saveTo = path.join(os.tmpdir(), filename);
      uploadData = {file: saveTo, type: mimetype};
      file.pipe(fs.createWriteStream(saveTo));
    });

    busboy.on('finish', () => {
      storage
        .bucket('chat-7c887.appspot.com')
        .upload(uploadData.file, {
          uploadType: 'media',
          metadata: {
            metadata: {
              contentType: uploadData.type,
            },
          },
        })
        .then(() => {
          return res.status(200).json({
            message: ' it worked!',
          });
        })
        .catch(err => {
          res.status(400).json({
            message: err,
          });
        });
    });
    busboy.end(req.rawBody);

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
