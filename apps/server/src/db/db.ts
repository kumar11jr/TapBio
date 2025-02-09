import { Schema, connect, model } from "mongoose";

connect(process.env.NEXT_PUBLIC_DB_URL); //replace with your mongoDb instance

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    maxLength: 20,
    trim: true,
  },
});

const urlDataSchema = new Schema({
  _id: Schema.Types.ObjectId,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  links:  [{}],
});

const User = model("User", userSchema);
const UrlData = model("UrlData", urlDataSchema);

export { User, UrlData };
