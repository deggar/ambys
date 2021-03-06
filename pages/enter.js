// import { auth, googleAuthProvider } from '../lib/firebase';
import styles from '../styles/Home.module.css';
import { auth } from '../lib/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { firestore } from '../lib/firebase';
import {
  addDoc,
  setDoc,
  doc,
  getDoc,
  onSnapshot,
  writeBatch,
  collection
} from 'firebase/firestore';
// import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { useRouter } from 'next/router';

import { useEffect, useState, useCallback, useContext } from 'react';
import debounce from 'lodash.debounce';
import Image from 'next/image';

// Sign in with popup && Google as the provider
const googleProvider = new GoogleAuthProvider();

export default function Enter(props) {
  const { user, username } = useContext(UserContext);

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return (
    <main className={styles.main}>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
}

// Sign in with Google button
function SignInButton() {
  const router = useRouter();
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
    if (auth.currentUser) {
      const theUser = auth.currentUser;
      const theEmailDom = theUser.email.split('@')[1];
      if (theEmailDom == 'ambys.com' || theUser.email == 'daneggar@gmail.com') {
        const userDoc = doc(firestore, `users/${theUser.uid}`);
        const usernameDoc = doc(firestore, `usernames/${theUser.uid}`);
        // console.log(theUser);
        // Commit both docs together as a batch write.
        // const batch = firestore.batch();
        // Get a new batch
        const batch = writeBatch(firestore);
        batch.set(userDoc, {
          useremail: theUser.email,
          photoURL: theUser.photoURL,
          displayName: theUser.displayName
        });
        batch.set(usernameDoc, { uid: theUser.uid });

        await batch.commit();
        router.push('/');
      } else {
        signOut(auth);
        router.push('/notavailable');
      }
    }
  };

  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <Image src={'/google.png'} alt="Google Sign in" width={24} height={24} />
      Sign in with Google
    </button>
  );
}

// Sign out button
function SignOutButton() {
  return <button onClick={() => signOut(auth)}>Sign Out</button>;
}

// Username form
function UsernameForm() {
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Create refs for both documents
    const userDoc = doc(firestore, `users/${user.uid}`);
    const usernameDoc = doc(firestore, `usernames/${formValue}`);

    // Commit both docs together as a batch write.
    // const batch = firestore.batch();
    // Get a new batch
    const batch = writeBatch(firestore);
    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName
    });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };

  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  //

  // useEffect(() => {
  //   checkUsername(formValue);
  // }, []);

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work

  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <input
            name="username"
            placeholder="myname"
            value={formValue}
            onChange={onChange}
          />
          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />
          <button type="submit" className="btn-green" disabled={!isValid}>
            Choose
          </button>

          <h3>Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </div>
        </form>
      </section>
    )
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">That username is taken!</p>;
  } else {
    return <p></p>;
  }
}
