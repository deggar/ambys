import firebaseConfig from './firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  query,
  where,
  limit,
  getDocs,
  collection,
  doc,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';

// Initialize firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize auth && firestore with the 'firebaseApp' property
export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
export const fromMillis = serverTimestamp.fromMillis;
// Storage exports
export const storage = getStorage(firebaseApp);
// export const STATE_CHANGED = ref(storage).TaskEvent.STATE_CHANGED;

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
  const usersRef = collection(firestore, 'users');
  const userquery = query(
    usersRef,
    where('username', '==', username),
    limit(1)
  );
  const userDoc = (await getDocs(userquery)).docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    // createdAt: 123, //new Timestamp(data.createdAt).toMillis(),
    // updatedAt: 123 //new Timestamp(data.updatedAt).toMillis()
  };
}

export default firebaseApp;
