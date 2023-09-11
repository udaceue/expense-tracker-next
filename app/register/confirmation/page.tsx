import React from "react";
import Link from "next/link";

function Page() {
  return (
    <div>
      Successfully created account, please check your email to verify your
      account
      <Link href={"login"}>Back To login</Link>
    </div>
  );
}

export default Page;
