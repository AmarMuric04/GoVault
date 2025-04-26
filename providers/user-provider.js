"use client";

import useAuthStore from "@/store/useAuthStore";
import { useEffect } from "react";

export default function UserProvider({ user }) {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  return null;
}
