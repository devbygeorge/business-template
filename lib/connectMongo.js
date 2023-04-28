import mongoose from "mongoose";

const connectOptions = {
  dbName: process.env.MONGODB_DB || 'production',
};

const connectMongo = async () =>
  mongoose.connect(process.env.MONGODB_URI, connectOptions);

export default connectMongo;
