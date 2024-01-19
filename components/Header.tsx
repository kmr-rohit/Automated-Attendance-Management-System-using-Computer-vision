import React from 'react'
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import AuthButton from "../components/AuthButton";
import { Button, buttonVariants } from "@/components/ui/button"

export default async function Header() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  return (
    <div className='w-full flex flex-col gap-20 items-center' >
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <div className="flex gap-4">
        <Link className={buttonVariants({ variant: "outline" })}
          href="/"
        >
          Home
        </Link>
        <Link  className={buttonVariants({ variant: "outline" })}
          href={user ?("/dashboard") : ("/login")}
         
        >
          Dashboard
        </Link>
        </div>
        <AuthButton />
      </div>
      </nav>
    </div>
  )
}

