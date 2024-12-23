import { auth } from "@/auth"
import { FC, ReactNode } from "react"

interface ComponentProps {
  children: ReactNode
}

const PrivateLayout: FC<ComponentProps> = async ({ children }) => {
  const session = await auth()

  return (
    <div>
      <h2>{session ? `Welcome ${session.user?.name}` : "Please sign in"}</h2>
      {children}
    </div>
  )
}

export default PrivateLayout
