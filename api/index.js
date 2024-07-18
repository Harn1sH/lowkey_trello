const express = require("express");
const app = express();
const signUpRouter = require("./routes/signUpRouter");
const loginRouter = require("./routes/loginRouter");
const cors = require("cors");
const connectDB = require("./connectDB");
require("dotenv").config();

//connect to mongo db
connectDB();

//middlewares

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/signup", signUpRouter);
app.use("/login", loginRouter);

app.listen(process.env.PORT || 4000, () =>
  console.log(`listening on port ${process.env.PORT}`),
);
