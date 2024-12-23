import { FC } from "react"
import Image from "next/image"
import logoImage from "@/assets/knight.png"
import ModeToggle from "@/components/ModeToggle"
import AuthTabs from "@/app/auth/components/AuthTabs"

interface ComponentProps {}

const page: FC<ComponentProps> = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5">
      <div className="absolute top-4 left-4">
        <Image width={40} height={40} alt="logo" src={logoImage} />
      </div>
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <AuthTabs />
    </div>
  )
}

export default page
