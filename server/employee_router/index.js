const { bonusService } = require("./bonus/bonus.service");
const { checkingService } = require("./checking/checking.service");
const { leaveFormService } = require("./leaveForm/leave_form.service");
const { memberService } = require("./member/member.service");
const employee_router = (app) => {
  memberService(app);
  checkingService(app);
  leaveFormService(app);
  bonusService(app);
};
module.exports = { employee_router };
