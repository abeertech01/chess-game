import { signIn } from "@/auth"
import startDB from "@/lib/db"
import { imageUpload } from "@/lib/imageUpload"
import UserModel from "@/models/user"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const formData = await req.formData()

  let values: { [key: string]: FormDataEntryValue } = {}
  formData.forEach((value, key) => {
    values[key] = value
  })

  try {
    await startDB()
    if (
      values.name &&
      values.username &&
      values.email &&
      values.password &&
      values.profileImage
    ) {
      // see if user already exists
      const existingUser = await UserModel.findOne({
        $or: [{ email: values.email }, { username: values.username }],
      })
      if (existingUser) {
        return NextResponse.json({
          success: false,
          error: "User already exists",
        })
      }

      const imageUploadResult = await imageUpload(values.profileImage as File)

      if (imageUploadResult.success) {
        const user = await UserModel.create({
          name: values.name,
          username: values.username,
          email: values.email,
          password: values.password,
          avatar: {
            id: imageUploadResult.result.public_id,
            url: imageUploadResult.result.secure_url,
          },
        })

        // TODO: sign in with nextauth's (credentials way)
        await signIn("credentials", {
          userAddress: user.username,
          password: user.password,
          redirectTo: "/",
        })

        return NextResponse.json({
          success: true,
          user,
        })
      } else {
        return NextResponse.json({
          success: false,
          error: "Something went wrong",
        })
      }
    }

    // return NextResponse.json({
    //   success: true,
    //   values,
    // })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    })
  }
}
