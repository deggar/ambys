// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FBC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FBC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FBC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FBC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FBC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FBC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FBC_MEASUREMENT_ID
};

export default firebaseConfig;
