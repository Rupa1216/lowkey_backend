var admin = require("firebase-admin");

var serviceAccount;

if (process.env.FIREBASE_KEY) {
    serviceAccount = JSON.parse(process.env.FIREBASE_KEY);
}
else {
    serviceAccount = require("./firebase_key.json");
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://lowkey-frontend.firebaseio.com"
});