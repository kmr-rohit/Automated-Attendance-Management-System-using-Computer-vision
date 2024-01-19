

import HomePage from "@/components/HomePage";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Header from "@/components/Header";


export default async function Index() {
  
  return (
    <div className="w-full flex flex-col gap-20 items-center">
      <Header />
      <HomePage />
    </div>
  );
}
