import { signIn } from "@/auth"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { userAddress, password } = await req.json()

  const result = await signIn("credentials", {
    userAddress,
    password,
    redirect: false,
  })

  if (!result || result.error) {
    return NextResponse.json({ error: "Invalid credentials" })
  } else {
    return NextResponse.json({ success: true })
  }
}
