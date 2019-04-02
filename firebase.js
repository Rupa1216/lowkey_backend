var admin = require("firebase-admin");

var serviceAccount = require(process.env.FIREBASE_KEY || "./firebase_key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lowkey-frontend.firebaseio.com"
});