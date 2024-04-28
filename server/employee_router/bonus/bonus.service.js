const { Router } = require("express");
const MemberModel = require("./bonus.model");
const moment = require("moment");

const router = Router();

const bonusService = async (app) => {
  app.use("/employee/bonus", router);

  router.get("", async (req, res, next) => {
    try {
      const data = await MemberModel.find({
        nameBonus: { $regex: req.query?.text || "", $options: "i" },
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

  router.get("/statistics-salary", async (req, res, next) => {
    try {
      const data = await MemberModel.aggregate([
        {
          $addFields: {
            memberId: { $toString: "$_id" },
          },
        },
        {
          $lookup: {
            from: "employee___leave_forms",
            localField: "memberId",
            foreignField: "ownerId",
            as: "leaveForms",
          },
        },
        {
          $lookup: {
            from: "employee___checkings",
            localField: "memberId",
            foreignField: "userId",
            as: "checkings",
          },
        },
        // {
        //   $set: {
        //     member: { $arrayElemAt: ["$member", 0] },
        //   },
        // },
      ]);
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
      const data = new MemberModel(body);
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
      const data = await MemberModel.updateOne({ _id: req.body._id }, body);

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

module.exports = { bonusService };
