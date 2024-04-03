import { FIREBASE_DB, FIREBASE_APP } from '@/firebase.config';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';

export async function getUserByEmail(email: string) {
  try {
    const docRef = doc(FIREBASE_DB, 'users', email);
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

export async function getRecentFoods(email: string | null | undefined) {
  if (!email) {
    console.error('No email provided');
    return;
  }

  try {
    const docRef = doc(FIREBASE_DB, 'recent-foods', email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      return docSnap.data().recentFoods;
    } else {
      console.log('No such document!');
      return [];
    }
  } catch (error) {
    console.error(error);
  }
}

export async function addRecentFood(
  email: string | null | undefined,
  food: { fdcId: string | string[]; name: string; nutrients: any }
) {
  if (!email) {
    console.error('No email provided');
    return;
  }

  try {
    const docRef = doc(FIREBASE_DB, 'recent-foods', email);
    const docSnap = await getDoc(docRef);

    const foodItem = { ...food, date: new Date() };

    if (docSnap.exists()) {
      let recentFoods = docSnap.data().recentFoods;
      console.log('RECENT FOOD DATA data:', recentFoods);
      recentFoods = recentFoods || [];
      recentFoods.push(foodItem);

      await setDoc(docRef, { recentFoods }, { merge: true });
    } else {
      console.log('No such document!');
      // create new document
      await setDoc(docRef, { recentFoods: [foodItem] });
    }
  } catch (error) {
    console.error(error);
  }
}
