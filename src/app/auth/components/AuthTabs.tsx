import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FC } from "react"
import RegisterForm from "./RegisterForm"
import LoginForm from "./LoginForm"

interface ComponentProps {}

const AuthTabs: FC<ComponentProps> = () => {
  return (
    <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <LoginForm />
        {/* <h1>Login Form</h1> */}
      </TabsContent>
      <TabsContent value="register">
        <RegisterForm />
      </TabsContent>
    </Tabs>
  )
}

export default AuthTabs
