"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Session } from "@supabase/gotrue-js";
import { useSupabase } from "@/components/providers/supabase-provider";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { IUserMetaData } from "@/types/Auth.types";

interface IContext {
  user: any | null | undefined;
  error: any;
  isLoading: boolean;
  mutate: any;
  getUser: () => Promise<any>;
  signOut: () => Promise<void>;
  signInWithGithub: () => Promise<any>;
  signInWithEmail: (email: string, password: string) => Promise<any>;
  signUpWithEmail: (
    email: string,
    password: string,
    options: IUserMetaData,
  ) => Promise<any>;
}
const Context = createContext<IContext>();

export default function SupabaseAuthProvider({
  // serverSession,
  children,
}: {
  // serverSession: Session | null;
  children: React.ReactNode;
}) {
  const { supabase } = useSupabase();
  const router = useRouter();
  const [loggedUser, setLoggedUser] = useState(null);
  const [serverSession, setServerSession] = useState(null);

  const getUser = async () => {
    const { data: user, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", serverSession?.user?.id)
      .single();
    if (error) {
      console.log(error);
      return null;
    } else {
      setLoggedUser(user);
      return user;
    }
  };

  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWR(serverSession ? "profile-context" : null, getUser);

  const signInWithGithub = async () => {
    await supabase.auth.signInWithOAuth({ provider: "github" });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const signInWithEmail = async (email: string, password: string) => {
    const {
      error,
      data: { user, session },
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (session) {
      router.push("/");
    }
    if (error) {
      return error.message;
    }
    return null;
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    options: IUserMetaData,
  ) => {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options,
    });
    if (data) {
      return data;
    }
    if (error) {
      return error.message;
    }
    return null;
  };

  // Refresh the Page to Sync Server and Client
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setServerSession(session);
      setLoggedUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== serverSession?.access_token) {
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase, serverSession?.access_token]);

  console.log("server-session", serverSession);

  const exposed = {
    user,
    error,
    isLoading,
    mutate,
    signOut,
    signInWithGithub,
    signInWithEmail,
    signUpWithEmail,
    getUser,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
}

export const useSupabaseAuth = () => {
  let context = useContext(Context);
  if (context === undefined) {
    throw new Error(
      "useSupabaseAuth must be called inside SupabaseAuthProvider",
    );
  }
  return context;
};
