"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSupabaseAuth } from "@/components/providers/supabase-auth-provider";
import { useRouter } from "next/navigation";
import { AlertCircle, FileWarning, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function SignInForm() {
  const { signInWithEmail, user } = useSupabaseAuth();
  const router = useRouter();
  const [errorAlert, setErrorAlert] = useState({
    error: false,
    message: "",
  });

  const formSchema = z.object({
    email: z.string().trim().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().trim().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { control } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const error = await signInWithEmail(values.email, values.password);
      // @ts-ignore
      if (error) {
        setErrorAlert({ error: true, message: error });
        setTimeout(() => {
          setErrorAlert({ error: false, message: "" });
        }, 3000);
        return;
      }
    } catch (error) {}
  }

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" type={"password"} {...field} />
                </FormControl>
                {/*<FormDescription>*/}
                {/*  This is your public display name.*/}
                {/*</FormDescription>*/}
                <FormMessage />
              </FormItem>
            )}
          />
          <div className={"flex gap-4"}>
            <Link href="/register">
              <Button variant={"secondaryButton"}>Sign Up</Button>
            </Link>
            <Button variant={"secondaryButton"} type={"submit"}>
              Sign In
            </Button>
          </div>
        </form>
      </Form>
      <DevTool control={control}></DevTool>

      {/*SHOW ALERT IF ERROR*/}
      {errorAlert.error ? (
        <Alert
          variant="destructive"
          className={
            "opacity-100 absolute top-0 right-0 max-w-md mb-7 transition-all duration-[3000]"
          }
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorAlert.message}</AlertDescription>
        </Alert>
      ) : (
        <Alert
          variant="destructive"
          className={
            "opacity-0 absolute top-0 right-0 max-w-md mb-7 transition-all duration-[3000] ease-in-out"
          }
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorAlert.message}</AlertDescription>
        </Alert>
      )}
    </>
  );
}

export default SignInForm;
