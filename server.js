const admin = require("firebase-admin");
const serviceAccount = require("./eduhub-firebase-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
