import { Model, model, models, ObjectId, Schema } from "mongoose"
import { compareSync, genSaltSync, hashSync } from "bcryptjs"

export interface BaseUserDoc {
  _id?: ObjectId
  name: string
  username: string
  avatar: {
    id: string
    url: string
  }
  email: string
  password?: string
  created_at: Date
}

export interface Methods {
  compare(password: string): boolean
}

const schema = new Schema<BaseUserDoc, {}, Methods>({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  avatar: {
    type: Object,
    id: String,
    url: String,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
})

schema.pre("save", function () {
  if (this.isModified("password") && this.password) {
    const salt = genSaltSync(10)
    this.password = hashSync(this.password, salt)
  }
  return false
})

schema.methods.compare = function (password) {
  if (this.password) {
    return compareSync(password, this.password)
  }
  return false
}

const UserModel = models.User || model("User", schema)
export default UserModel as Model<BaseUserDoc, {}, Methods>
