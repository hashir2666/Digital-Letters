import { addDoc, collection, doc, getDoc, serverTimestamp, Timestamp } from 'firebase/firestore'
import { db } from './config.js'

const lettersCollection = collection(db, 'letters')

export async function createLetter({ text, envelopeStyle, mood, title, signature }) {
  try {
    // Generate expiration date (72 hours from now)
    const now = new Date()
    const expireDate = new Date(now.getTime() + 72 * 60 * 60 * 1000)
    const expireAt = Timestamp.fromDate(expireDate)

    const docRef = await addDoc(lettersCollection, {
      text,
      envelopeStyle,
      mood,
      title: title || 'A Letter for You',
      signature: signature || 'Anonymous',
      opens: 0,
      createdAt: serverTimestamp(),
      expireAt: expireAt,
    })

    console.log("Document written with ID: ", docRef.id)
    return docRef.id
  } catch (error) {
    console.error("Error adding document: ", error)
    throw error
  }
}

export async function getLetter(id) {
  const ref = doc(db, 'letters', id)
  const snap = await getDoc(ref)
  if (!snap.exists()) return null
  return snap.data()
}

export async function recordOpen(id) {
  const { updateDoc, increment } = await import('firebase/firestore')
  const ref = doc(db, 'letters', id)
  await updateDoc(ref, {
    opens: increment(1)
  })
}

