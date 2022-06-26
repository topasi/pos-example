import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSEGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABSE_URL,
}

const app = initializeApp(firebaseConfig)

const db = getDatabase(app)
const storage = getStorage(app)

export { db, storage }
