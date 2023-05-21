const express = require("express");
const router = express();
const write = require("../controller/write");

router.post("/create", write.createWriting);

module.exports = router;
