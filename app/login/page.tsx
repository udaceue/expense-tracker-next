import Link from "next/link";
import Messages from "./messages";
import Image from "next/image";
import logo from "../../assets/images/logo.png";
import { Button } from "@/components/ui/button";
import SignInForm from "@/components/forms/SignInForm";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";
export default function Login() {
  return (
    <div className="w-full min-h-screen flex justify-center">
      <div
        className={
          "w-full mt-12 min-h-full sm:max-w-sm md:max-w-md lg:max-w-xl md:mt-24 sm:h-[600px] flex flex-col"
        }
      >
        <div className={"w-full h-56 relative"}>
          <Image
            src={logo}
            alt={"Udaceue expense tracker Logo"}
            fill={true}
            className="object-contain"
          />
        </div>
        <div
          className={
            "bg-card w-full h-full flex flex-col items-center justify-center"
          }
        >
          <SignInForm />
          <div>
            <p
              className={
                "text-sm mt-2 text-blue-600 hover:text-blue-800 cursor-pointer mb-2"
              }
            >
              Forget password?
            </p>
          </div>
          <ThemeSwitcher></ThemeSwitcher>
        </div>
      </div>
      {/*<form*/}
      {/*    className="w-full bg-slate-400"*/}
      {/*    action="/auth/sign-in"*/}
      {/*    method="post"*/}
      {/*>*/}
      {/*  <label className="text-md" htmlFor="email">*/}
      {/*    Email*/}
      {/*  </label>*/}
      {/*  <input*/}
      {/*    className="rounded-md px-4 py-2 bg-inherit border mb-6"*/}
      {/*    name="email"*/}
      {/*    placeholder="you@example.com"*/}
      {/*    required*/}
      {/*  />*/}
      {/*  <label className="text-md" htmlFor="password">*/}
      {/*    Password*/}
      {/*  </label>*/}
      {/*  <input*/}
      {/*    className="rounded-md px-4 py-2 bg-inherit border mb-6"*/}
      {/*    type="password"*/}
      {/*    name="password"*/}
      {/*    placeholder="••••••••"*/}
      {/*    required*/}
      {/*  />*/}
      {/*  <button className="bg-green-700 rounded px-4 py-2 text-white mb-2">*/}
      {/*    Sign In*/}
      {/*  </button>*/}
      {/*  <button*/}
      {/*    formAction="/auth/sign-up"*/}
      {/*    className="border border-gray-700 rounded px-4 py-2 text-black mb-2"*/}
      {/*  >*/}
      {/*    Sign Up*/}
      {/*  </button>*/}
      {/*  <Messages />*/}
      {/*</form>*/}
      {/*<Link*/}
      {/*  href="/"*/}
      {/*  className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"*/}
      {/*>*/}
      {/*  <svg*/}
      {/*    xmlns="http://www.w3.org/2000/svg"*/}
      {/*    width="24"*/}
      {/*    height="24"*/}
      {/*    viewBox="0 0 24 24"*/}
      {/*    fill="none"*/}
      {/*    stroke="currentColor"*/}
      {/*    strokeWidth="2"*/}
      {/*    strokeLinecap="round"*/}
      {/*    strokeLinejoin="round"*/}
      {/*    className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"*/}
      {/*  >*/}
      {/*    <polyline points="15 18 9 12 15 6" />*/}
      {/*  </svg>{' '}*/}
      {/*  Back*/}
      {/*</Link>*/}
    </div>
  );
}
