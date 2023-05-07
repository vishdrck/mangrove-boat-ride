import mongoose from "mongoose";

const SCHEMA = mongoose.Schema;

const authSchema = new SCHEMA({
  token: {
    type: String,
    required: false
  },
  expiryDate: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: String,
    default: false
  }
});

export default mongoose.model('Auth', authSchema,'auth');