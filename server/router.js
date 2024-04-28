const { static, json } = require("express");
const { mongodbLoader } = require("./config/mongodbLoader");
const { fileService } = require("./file/file.service");

const { accountService } = require("./account/account.service");
const { employee_router } = require("./employee_router");

const router = async ({ app }) => {
  app.get("/", (req, res) => {
    res.status(200).send("Server sẵn sàng").end();
  });
  await mongodbLoader();
  //   app.use(urlencoded({ extended: false }));
  app.use(json());

  employee_router(app);

  // common router
  accountService(app);
  fileService(app);
};

module.exports = { router };
