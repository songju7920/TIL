const router = require("express")();
const oauth = require("../controller/OAuth");

router.get("/github/login", oauth.login);
router.get("/github/getCode", oauth.getToken);

module.exports = router;
