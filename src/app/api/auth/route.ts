import mime from "mime"
import { stat, mkdir, writeFile } from "fs/promises"
import { join } from "path"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const image = (formData.get("profileImage") as File) || null

  const buffer = Buffer.from(await image.arrayBuffer())
  const relativeUploadDir = `/uploads/${new Date(Date.now())
    .toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-")}`

  const uploadDir = join(process.cwd(), "public", relativeUploadDir)

  try {
    await stat(uploadDir)
  } catch (error: any) {
    if (error.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true })
    } else {
      console.error(
        "Error while trying to create directory when uploading file.\n",
        error
      )

      return NextResponse.json(
        {
          error: "Something went wrong.",
        },
        {
          status: 500,
        }
      )
    }
  }

  try {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const filename = `${image.name.replace(
      /\.[^/.]+$/,
      ""
    )}-${uniqueSuffix}.${mime.getExtension(image.type)}`
    await writeFile(`${uploadDir}/${filename}`, buffer)
    const fileUrl = `${relativeUploadDir}/${filename}`

    return NextResponse.json({
      fileUrl,
    })
  } catch (error) {
    console.error("Error while trying to upload the file.\n", error)

    return NextResponse.json(
      {
        error: "Something went wrong.",
      },
      {
        status: 500,
      }
    )
  }
}
