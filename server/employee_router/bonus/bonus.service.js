const { Router } = require("express");
const BonusModel = require("./bonus.model");

const router = Router();

const bonusService = async (app) => {
  app.use("/employee/bonus", router);

  router.get("", async (req, res, next) => {
    try {
      const data = await BonusModel.find({
        nameBonus: { $regex: req.query?.text || "", $options: "i" },
        deleted: { $ne: true },
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
      const data = await BonusModel.aggregate([
        {
          $match: {
            deleted: { $ne: true },
          },
        },
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
      const data = new BonusModel(body);
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
      const data = await BonusModel.updateOne({ _id: req.body._id }, body);

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

  router.delete("/:id", async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await BonusModel.updateOne({ _id: id }, { deleted: true });

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
