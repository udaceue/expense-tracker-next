import React from "react";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";
import SignUpForm from "@/components/forms/SignUpForm";

function Page() {
  return (
    <div className="w-full min-h-screen flex justify-center">
      <div
        className={
          "w-full min-h-full sm:max-w-sm md:max-w-md lg:max-w-xl flex flex-col"
        }
      >
        <div className={"w-full h-32 relative"}>
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
          <SignUpForm />
          <div className={"mt-4 mb-4"}>
            <p className={"text-sm"}>
              Do you already have account?
              <span
                className={
                  "text-blue-600 hover:text-blue-800 cursor-pointer font-semibold"
                }
              >
                Sign In
              </span>
            </p>
          </div>
          <ThemeSwitcher></ThemeSwitcher>
        </div>
      </div>
    </div>
  );
}

export default Page;
