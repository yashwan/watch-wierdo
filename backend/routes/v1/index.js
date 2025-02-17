const express = require("express");
const router = express.Router();
const videos = require("./videos.route")

router.use('/videos', videos)

module.exports = router;