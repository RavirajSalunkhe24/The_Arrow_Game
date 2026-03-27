const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    updateScore,
    getLeaderboard
} = require("../controllers/gameController");

router.post("/score", protect, updateScore);

router.get("/leaderboard", getLeaderboard);

module.exports = router;