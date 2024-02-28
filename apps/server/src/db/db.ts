import { Schema, connect, model } from "mongoose";

connect("mongodb://localhost:27017/tapbio"); //replace with your mongoDb instance

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
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  links: {
    type: Array,
    required: true,
  },
});

const User = model("User", userSchema);
const UrlData = model("UrlData", urlDataSchema);

export { User, UrlData };
