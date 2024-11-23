import React from "react"
import AuthTabs from "./components/AuthTabs"

type AuthProps = {}

const Auth: React.FC<AuthProps> = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5">
      <AuthTabs />
    </div>
  )
}
export default Auth
