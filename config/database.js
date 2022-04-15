const mongoose = require("mongoose");
const { MONGO_URL } = process.env;
console.log('MONGO_URL',MONGO_URL)
exports.connect = () =>
  mongoose
    .connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("DB CONNECTED SUCCESSFULLY"))
    .catch((error) => {
      console.log("DB CONNECTION FAILED", error);
      process.exit(1);
    });
