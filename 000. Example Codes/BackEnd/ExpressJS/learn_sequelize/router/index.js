const express = require("express");
const router = express();

const write = require("./write");

router.use("/writing", write);

module.exports = router;
