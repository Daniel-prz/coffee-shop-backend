const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");
const port = 3000;
const uri = `mongodb+srv://dan84perez:${process.env.DB_USER_PASSWORD}@cluster0.23zswrn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const productRouter = require("./controller/routes");

app.use(cors());
app.use(express.json());

main().catch((error) => console.log(error));

async function main() {
  await mongoose.connect(uri);
  console.log("Connected to MongoDB");
}

app.use(productRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
