const { Router } = require("express");
const LeaveFormModel = require("./leave_form.model");
const moment = require("moment");
const { authMiddleware } = require("../../config/auth.middleware");

const router = Router();

const leaveFormService = async (app) => {
  app.use("/employee/leave-form", router);

  router.get("", async (req, res, next) => {
    try {
      const data = await LeaveFormModel.aggregate([
        {
          $match: {
            fullname: {
              $regex: req.query?.fullname || "",
              $options: "i",
            },
            deleted: { $ne: true },
          },
        },
        // {
        //   $addFields: {
        //     ownerId: { $toObjectId: "$ownerId" },
        //   },
        // },
        {
          $lookup: {
            from: "employee___members",
            localField: "code",
            foreignField: "codeMember",
            as: "member",
          },
        },
        {
          $set: {
            member: { $arrayElemAt: ["$member", 0] },
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
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
      body.ownerId = req.user?._id;
      const data = new LeaveFormModel(body);
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
      const data = await LeaveFormModel.updateOne({ _id: req.body._id }, body);

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
      const data = await LeaveFormModel.updateOne(
        { _id: id },
        { deleted: true }
      );

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

module.exports = { leaveFormService };
