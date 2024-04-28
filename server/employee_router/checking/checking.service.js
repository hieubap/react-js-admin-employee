const { Router } = require("express");
const CheckingModel = require("./checking.model");
const moment = require("moment");

const router = Router();

const checkingService = async (app) => {
  app.use("/employee/checking", router);

  router.get("", async (req, res, next) => {
    try {
      const data = await CheckingModel.find({
        userId: req.query?.userId,
      });
      res.json({
        code: 0,
        data,
      });
    } catch (error) {
      res.json({
        code: 500,
        message: error?.message,
      });
    }
  });

  router.get("/all", async (req, res, next) => {
    try {
      const data = await CheckingModel.find({});
      res.json({
        code: 0,
        data,
      });
    } catch (error) {
      res.json({
        code: 500,
        message: error?.message,
      });
    }
  });

  router.post("", async (req, res, next) => {
    try {
      const body = req.body;
      if (!body.userId) {
        res.json({
          code: 400,
          message: "",
        });
        return;
      }

      const data = new CheckingModel(body);
      await data.save();
      res.json({
        code: 0,
        data,
      });
    } catch (error) {
      res.json({
        code: 500,
        message: error?.message,
      });
    }
  });

  router.put("", async (req, res, next) => {
    try {
      const body = req.body;
      if (!body.userId) {
        res.json({
          code: 400,
          message: "",
        });
        return;
      }

      const data = await CheckingModel.updateOne({ _id: req.body._id }, body);

      res.json({
        code: 0,
        data,
      });
    } catch (error) {
      res.json({
        code: 500,
        message: error?.message,
      });
    }
  });
};

module.exports = { checkingService };
