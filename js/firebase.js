// BharatKart Owner Panel — shared Firebase initialization.
// Uses the existing BharatKart Firebase project and collections.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDLCNAA-bbUo2EQfp1EDfGE76b8iSQmCTI",
  authDomain: "bharat-c734b.firebaseapp.com",
  projectId: "bharat-c734b",
  appId: "1:273763763790:web:b2499eff81a4b5b5c3651f"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
