import mongoose from "mongoose";
import createDebug from "debug";

const debug = createDebug("simoworld-api:database:connectDatabase:*");

const connectDatabase = async (mongoDbUrl: string) => {
  mongoose.set("strictQuery", false);
  mongoose.set("debug", true);
  mongoose.set("toJSON", {
    virtuals: true,
    transform(doc, ret) {
      delete ret._id;
      delete ret.__v;
    },
  });

  try {
    await mongoose.connect(mongoDbUrl);
  } catch (error: unknown) {
    debug(error);
  }
};

export default connectDatabase;
