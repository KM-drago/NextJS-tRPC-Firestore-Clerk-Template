import { applicationDefault, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

/**
 * To access firebase a Private Key is required.
 * refer - https://firebase.google.com/docs/admin/setup
 *
 * A json file with the key is genareted. The path of this file should be added to the env file with the following variable name,
 * GOOGLE_APPLICATION_CREDENTIALS = "<Private Key file path>"
 *
 * Once this is set the initializeApp() function with applicationDefault() reads this env variable to initialize firebase with necessary access.
 *
 * Once initialized you can use db in tRPC context to access firebase.
 */

// Condition is here to make sure no duplicate apps are initialized
if (!getApps().length) {
  initializeApp({
    credential: applicationDefault(),
  });
}

export const db = getFirestore();
