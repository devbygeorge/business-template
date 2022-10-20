import mongoose from "mongoose";

const connectOptions = {
  dbName: `projects-template`,
};

const connectMongo = async () =>
  mongoose.connect(process.env.MONGODB_URI, connectOptions);

export default connectMongo;
