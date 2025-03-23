"use client";

import { useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";

export default function StoreUser({ user }) {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return null;
}
