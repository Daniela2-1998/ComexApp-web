import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Conexión a base de datos (y uso de datos del archivo .env.local)
const firebaseConfig = {
  apiKey: "AIzaSyBSc8xfOuO4HJ64S2xmvRIhNMnruVZwWLE",
  authDomain: "comexapp-251c2.firebaseapp.com",
  projectId: "comexapp-251c2",
  storageBucket: "comexapp-251c2.appspot.com",
  messagingSenderId: "731799472985",
  appId: "1:731799472985:web:c0d6db8fbe4263db42da48"
};

// Inicia Firebase
const app = initializeApp(firebaseConfig);

// Acceso a Base de Datos
export const db = getFirestore(app);


