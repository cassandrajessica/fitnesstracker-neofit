import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  name: {
    first: {
      type: String,
      required: true,
    },
    last: {
      type: String,
      required: true,
    }
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// pre save middleware to automatically hash password before saving
userSchema.pre("save", function (next) {
  // refers to user being saved
  const user = this;

  //hashes password only if it is new or has been modified
  // prevents unnecessary rehashing
  if (!user.isModified("password")) {
    return next(); //  if no modification, skip and continue with save operation
  }

  // generate a salt - adds randomness for security 
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    // handle any errors during salt generation
    if (err) {
      return next(err); // if error, stop save operation
    }

    // hash password with salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      // handle any errors during hashing
      if (err) {
        return next(err); // if error, stop save operation
      }

      // replace plaintext password with hashed password
      user.password = hash;

      // continue with save operation and save password
      next();
    });
  });
});

const User = mongoose.model("User", userSchema);

export default User;
