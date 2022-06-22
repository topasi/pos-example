import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
	apiKey: 'AIzaSyD1I9TE0yb5l3a-Lw07eRyKmo9yBGkoUps',
	authDomain: 'pos-example-2b762.firebaseapp.com',
	projectId: 'pos-example-2b762',
	storageBucket: 'pos-example-2b762.appspot.com',
	messagingSenderId: '647853288796',
	appId: '1:647853288796:web:21c7defd06d1041c8ca599',
}

const app = initializeApp(firebaseConfig)

const db = getDatabase(app)

export { db }
