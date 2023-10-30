const router = require("express")();

const user = require("../controller/user");

router.post("/signUp", user.createUser);
router.delete("/withdrawal", user.deleteUser);
router.patch("/logIn", user.logIn);
router.patch("/logOut", user.logOut);

module.exports = router;
