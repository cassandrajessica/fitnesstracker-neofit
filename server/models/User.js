import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  name: {
    first: String,
    last: String,
    required: true,
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
  },
});

// hash password with bcrypt before saving to db
userSchema.pre("save", function (next) {
  const user = this;

  //hashes password only if it is new or has been modified
  if (!user.isModified("password")) {
    return next();
  }

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }

    // hash password with salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }

      // override the cleartext pass with the hashed pass
      user.password = hash;
      next();
    });
  });
});

// custom method to compare if password at login is correct
userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    // if error occurs during comparison, return the error
    if (err) {
      return cb(err);
    }

    // upon succesful comparison return back true or false
    cb(null, isMatch);
  });
};

const User = mongoose.model("User", userSchema);
