const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");
const path = require("path");
const port = 3000;
const uri = `mongodb+srv://dan84perez:${process.env.DB_USER_PASSWORD}@cluster0.23zswrn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const productRouter = require("./src/controller/routers/productRouter.js");
const authRouter = require("./src/controller/routers/authRouter.js");
const userRouter = require("./src/controller/routers/userRouter.js");
const auth = require("./src/middleware/auth");
const errorHandler = require("./src/middleware/errorHandler.js");
const upload = require("./src/middleware/upload.js");

// MIDDLEWARE ENABLES CORS

app.use(cors());

// MIDDLEWARE PARSES JSON BODIES

app.use(express.json());

// SERVE STATIC FILES

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

main().catch((error) => console.log(error));

async function main() {
  await mongoose.connect(uri);
  console.log("Connected to MongoDB");
}

app.use("/products", auth, productRouter);
app.use(authRouter);
app.use("/users", auth, userRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
