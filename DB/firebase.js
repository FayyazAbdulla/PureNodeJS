require('dotenv').config(); // Load environment variables
const admin = require('firebase-admin');

// Firebase Admin Configuration
const firebaseConfig = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};

try {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    databaseURL: process.env.DATABASE_URL,
  });
  console.log("Firebase Admin SDK initialized successfully.");
} catch (error) {
  console.error("Firebase Admin SDK initialization failed:", error.message);
  process.exit(1); // Exit application on initialization failure
}

const db = admin.firestore();
const auth = admin.auth();

module.exports = { db, auth };
