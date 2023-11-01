const router = require("express")();

const user = require("./user");
const OAuth = require("./OAuth");

router.use("/OAuth", OAuth);
router.use("/user", user);

module.exports = router;
