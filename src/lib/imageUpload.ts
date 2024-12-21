import { UploadResponse, uploadToCloudinary } from "@/lib/cloudinary"
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary"

const imageUpload = async (profileImage: File) => {
  const imageBuffer = await profileImage.arrayBuffer()

  const mimeType = profileImage.type
  const encoding = "base64"
  const base64Data = Buffer.from(imageBuffer).toString(encoding)

  const imageUri = "data:" + mimeType + ";" + encoding + "," + base64Data

  try {
    const uploadResponse: UploadResponse = await uploadToCloudinary(
      imageUri,
      profileImage.name
    )

    if (uploadResponse.success) {
      const result: { success: true; result: UploadApiResponse } = {
        success: true,
        result: uploadResponse.result,
      }

      return result
    } else {
      const error: { success: false; error: UploadApiErrorResponse } = {
        success: false,
        error: uploadResponse.error,
      }

      return error
    }
  } catch (error) {
    const err = error as UploadApiErrorResponse
    const failure: { success: false; error: UploadApiErrorResponse } = {
      success: false,
      error: err,
    }

    return failure
  }
}

export { imageUpload }
