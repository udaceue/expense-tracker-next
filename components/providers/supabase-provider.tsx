"use client";
import React, { createContext, useContext, useState } from "react";
import createdClient from "@/utils/supabase-browser";

const Context = createContext(undefined);

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [supabase] = useState(() => createdClient);
  return (
    <Context.Provider value={{ supabase }}>
      <>{children}</>
    </Context.Provider>
  );
}

export const useSupabase = () => {
  let context = useContext(Context);
  if (context === undefined) {
    throw new Error("use Supabase must be use inside SupabaseProvider");
  } else {
    return context;
  }
};
