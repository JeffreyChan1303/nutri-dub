import { FIREBASE_DB, FIREBASE_APP } from '@/firebase.config';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';

export async function getUserByEmail(email: string) {
  try {
    const docRef = doc(FIREBASE_DB, '/users', email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      return docSnap.data();
    } else {
      console.log('No such document!');
    }
  } catch (error) {
    console.error(error);
  }
}

// export async function updateUser() {
//   try {
//     const docRef = doc(FIREBASE_DB, 'users', 'test@gmail.com');
//     await setDoc(docRef, { key: 'value' });
//   } catch (error) {
//     console.error(error);
//   }
// }
