import { NextRequest, NextResponse } from "next/server"
import { uploadToCloudinary } from "@/utils/cloudinary"

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const profileImage = formData.get("profileImage") as File

  const imageBuffer = await profileImage.arrayBuffer()

  const mimeType = profileImage.type
  const encoding = "base64"
  const base64Data = Buffer.from(imageBuffer).toString(encoding)

  // this will be used to upload the file
  const imageUri = "data:" + mimeType + ";" + encoding + "," + base64Data

  const res = await uploadToCloudinary(imageUri, profileImage.name)

  if (res.success && res.result) {
    return NextResponse.json({
      success: true,
      profileImage: res.result.secure_url,
    })
  } else {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    })
  }
}
