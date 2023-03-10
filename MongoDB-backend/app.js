const express = require("express");
const cors = require("cors");
const database = require("./config/database");
const userRouter = require("./user-management/routes/user-routes");
const productRouter = require("./user-management/routes/product-routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/products", productRouter);

start();

async function start() {
  await database(app);

  app.listen(3000, () => console.log("Server working on port 3000"));
}
