const mongoose = require("mongoose");
require("dotenv").config();
async function dbConnect() {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connected to MongoDB Atlas");
    })
    .catch((err) => {
      console.log("Failed to connect MongoDB Atlas");
      console.error(err);
    });
}
module.exports = dbConnect;
