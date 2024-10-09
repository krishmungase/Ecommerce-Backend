const mongoose = require('mongoose');

const connect = () => {
  mongoose
    .connect(
      "mongodb+srv://KrishMungase:24NyrA56HEwKvVCr@cluster0.h2rv0mz.mongodb.net/ECodeMitra"
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
};

module.exports = connect;