import { cloudinary } from "@/constants/config"
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary"

export type UploadResponse =
  | { success: true; result: UploadApiResponse }
  | { success: false; error: UploadApiErrorResponse }

const uploadToCloudinary = (
  fileUri: string,
  filename: string
): Promise<UploadResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(fileUri, {
        invalidate: true,
        resource_type: "auto",
        filename_override: filename,
        folder: "chess_players",
        use_filename: true,
      })
      .then((result) => {
        resolve({ success: true, result })
      })
      .catch((error) => {
        reject({ success: false, error })
      })
  })
}

export { uploadToCloudinary }
