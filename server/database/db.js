const mongoose = require("mongoose");

exports.mongooseConnection = async () => {
  try {
    const client = await mongoose.connect(process.env.MONGODB_URL);
    console.log("mongodb connected");
  } catch (err) {
    console.log({ err });
  }
};
