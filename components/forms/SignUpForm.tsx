"use client";
import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DevTool } from "@hookform/devtools";

function SignUpForm() {
  const formSchema = z
    .object({
      name: z.string().trim().min(2, {
        message: "Username must be at least 4 characters.",
      }),
      surname: z.string().trim().min(2, {
        message: "Username must be at least 4 characters.",
      }),
      username: z.string().trim().min(2, {
        message: "Username must be at least 4 characters.",
      }),
      age: z.coerce
        .number({
          required_error: "Age is required",
        })
        .gte(18, {
          message: "Age needs to be equal or higher than 18",
        })
        .lte(130, {
          message: "Age is too Big",
        }),
      password: z.string().trim().min(8, {
        message: "Password must be at least 8 characters.",
      }),
      confirmPassword: z.string().trim().min(8, {
        message: "Password must be at least 8 characters.",
      }),
    })
    .required()
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"], // path of error
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Surname</FormLabel>
                <FormControl>
                  <Input placeholder="Surname" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input placeholder="18" type={"number"} {...field} />
                </FormControl>
                {/*<FormDescription>*/}
                {/*  This is your public display name.*/}
                {/*</FormDescription>*/}
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
                  <Input placeholder="Password" type={"password"} {...field} />
                </FormControl>
                {/*<FormDescription>*/}
                {/*  This is your public display name.*/}
                {/*</FormDescription>*/}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirm password"
                    type={"password"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className={"flex justify-between"}>
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

export default SignUpForm;
