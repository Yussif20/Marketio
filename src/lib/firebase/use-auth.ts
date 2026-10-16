"use client";

import { onAuthStateChanged, type User } from "firebase/auth";
import { useEffect, useState } from "react";
import { getFirebaseAuth } from "./client";

/** The signed-in Firebase user. `ready` is false until Firebase has restored the session. */
export function useAuthUser() {
  const [state, setState] = useState<{ user: User | null; ready: boolean }>({ user: null, ready: false });

  useEffect(() => onAuthStateChanged(getFirebaseAuth(), (user) => setState({ user, ready: true })), []);

  return state;
}
