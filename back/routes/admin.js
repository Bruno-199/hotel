const express = require("express");
const router = express.Router();
const { loguear } = require("../controllers/admin");

router.post("/login", loguear);

module.exports = router;
