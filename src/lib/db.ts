import mongoose from "mongoose"

const uri = process.env.MONGOOSE_URI

if (!uri) throw new Error("MONGOOSE_URI is missing")

const startDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Database already connected")
      return
    }

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(uri)
      console.log("Database connected!!")
    } else {
      console.log("Connection is in progress...")
    }
  } catch (error) {
    throw error
  }
}

export default startDB
