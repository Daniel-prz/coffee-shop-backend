const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");
const port = 3000;
const uri = `mongodb+srv://dan84perez:${process.env.DB_USER_PASSWORD}@cluster0.23zswrn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const productRouter = require("./src/controller/routers/productRouter.js");
const authRouter = require("./src/controller/routers/authRouter.js");
const userRouter = require("./src/controller/routers/userRouter.js");
const auth = require("./src/middleware/auth");
const errorHandler = require("./src/middleware/errorHandler.js");
app.use(cors());
app.use(express.json());

main().catch((error) => console.log(error));

async function main() {
  await mongoose.connect(uri);
  console.log("Connected to MongoDB");
}

app.use(productRouter);
app.use(authRouter);
app.use(userRouter);
app.use(auth, productRouter);

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
