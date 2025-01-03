import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import UserModel, { BaseUserDoc, Methods } from "@/models/user"
import startDB from "@/lib/db"
import { isEmail } from "@/lib/utils"
import { HydratedDocument } from "mongoose"

class CustomError extends CredentialsSignin {
  constructor(message: string) {
    super(message)
    this.message = message
  }
  code = "custom_error"
}

type UserDoc = HydratedDocument<BaseUserDoc, Methods>

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const { userAddress, password } = credentials
        let user: BaseUserDoc | null

        const isItAnEmail = isEmail(userAddress as string)

        try {
        } catch (error) {}

        await startDB()
        if (isItAnEmail) {
          const email = userAddress as string
          user = await UserModel.findOne({ email }).select("+password")
        } else {
          const username = userAddress as string
          user = await UserModel.findOne({ username }).select("+password")
        }

        if (!(user as UserDoc)?.compare(password as string)) {
          throw new CustomError("Email/Password mismatched!")
        }

        return user
      },
    }),
  ],
  /**
   * -> jwt returns token initially right when users signs in.
   * -> jwt is called again with the defined changes.
   * -> jwt sends the token to session callback.
   * -> session callback is called with the token.
   * -> session callback returns the session object.
   * -> session object contains user's login credentials.
   * -> session is called every time the user visits the page, signs in or out.
   */
  // callbacks: {
  //   // TODO:
  // },
})
