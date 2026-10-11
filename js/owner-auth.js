import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Transition compatibility: the known existing owner account currently has role "admin".
// This UID allowlist is an interface guard only; Firestore Rules MUST enforce owner-only writes.
export const OWNER_UID = "tg5wZ1uUKINBtqVJhTdqROUXaNv1";

export async function verifyOwner(user) {
  if (!user || user.uid !== OWNER_UID) return false;
  const userSnap = await getDoc(doc(db, "users", user.uid));
  if (!userSnap.exists()) return false;
  const role = userSnap.data().role;
  return role === "owner" || role === "admin";
}

export function requireOwner(onAuthorized) {
  return onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.replace("index.html");
      return;
    }
    try {
      const allowed = await verifyOwner(user);
      if (!allowed) {
        await signOut(auth);
        window.location.replace("index.html?access=denied");
        return;
      }
      onAuthorized(user);
    } catch (error) {
      console.error("Owner verification failed:", error);
      document.body.innerHTML = `
        <main class="fatal-error">
          <h1>Could not verify owner access</h1>
          <p>Please check your connection and Firebase permissions, then reload this page.</p>
        </main>`;
    }
  });
}

export async function logoutOwner() {
  await signOut(auth);
  window.location.replace("index.html");
}
