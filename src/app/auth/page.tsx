import React from "react"
import AuthTabs from "./components/AuthTabs"
import { ModeToggle } from "@/components/ModeToggle"
import Image from "next/image"

type AuthProps = {}

const Auth: React.FC<AuthProps> = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5">
      <div className="absolute top-4 left-4">
        <Image width={40} height={40} alt="logo" src="/knight.png" />
      </div>
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <AuthTabs />
    </div>
  )
}
export default Auth
