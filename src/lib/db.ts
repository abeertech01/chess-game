import mongoose from "mongoose"

const uri = process.env.MONGOOSE_URI

if (!uri) throw new Error("MONGOOSE_URI is missing")

let connection: typeof mongoose

const startDB = async () => {
  try {
    if (!connection) {
      connection = await mongoose.connect(uri)
    }
  } catch (error) {
    throw error
  }
}

export default startDB
