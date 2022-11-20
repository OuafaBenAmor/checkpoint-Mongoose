const mongoose = require("mongoose");

const mongoUrl = "mongodb+srv://ouafa:1956@cluster0.swq3vuh.mongodb.net/testin";
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect Success");
  })
  .catch((error) => {
    console.log(error);
  });
