const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://127.0.0.1:27017/fullBank",
  () => {
    console.log("connected");
  },
  (e) => console.error(e)
);