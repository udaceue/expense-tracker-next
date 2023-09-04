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

function SignInForm() {
  const formSchema = z.object({
    username: z.string().trim().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().trim().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { control } = form;

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
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
              <Button variant={"secondaryButton"} type={"submit"}>
                Sign Up
              </Button>
            </Link>
            <Button variant={"secondaryButton"} type={"submit"}>
              Sign In
            </Button>
          </div>
        </form>
      </Form>
      <DevTool control={control}></DevTool>
    </>
  );
}

export default SignInForm;
