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
            <Link href={"forget-password"}>
              <p
                className={
                  "text-sm mt-2 text-blue-600 hover:text-blue-800 cursor-pointer mb-2"
                }
              >
                Forget password?
              </p>
            </Link>
          </div>
          <ThemeSwitcher></ThemeSwitcher>
        </div>
      </div>
    </div>
  );
}
