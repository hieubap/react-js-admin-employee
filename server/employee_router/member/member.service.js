const { Router } = require("express");
const MemberModel = require("./member.model");
const moment = require("moment");

const router = Router();

const memberService = async (app) => {
  app.use("/employee/member", router);

  router.get("", async (req, res, next) => {
    try {
      const text = req.query?.text || "";
      const data = await MemberModel.find({
        $or: [
          { fullname: { $regex: text, $options: "i" } },
          { codeMember: { $regex: text, $options: "i" } },
        ],
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
      const data = await MemberModel.aggregate([
        {
          $match: {
            ["fullname"]: {
              $regex: req.query?.text,
              $options: "i",
            },
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
        {
          $lookup: {
            from: "employee___bonus",
            let: { memberId: { $toString: "$_id" } },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $or: [
                      { $in: ["$$memberId", "$memberIds"] },
                      { $eq: ["$allMember", true] },
                    ],
                  },
                  deleted: {
                    $ne: true,
                  },
                },
              },
            ],
            // localField: "memberId",
            // foreignField: "memberIds",
            as: "bonus",
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

  router.delete("/:id", async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await MemberModel.updateOne({ _id: id }, { deleted: true });

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

module.exports = { memberService };
