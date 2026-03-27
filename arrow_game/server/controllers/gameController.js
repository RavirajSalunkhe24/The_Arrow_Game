const User = require("../models/User");

exports.updateScore = async (req, res) => {
    try {
        const { score, level } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // ✅ update score
        user.score = score;

        // ✅ update level (only if higher)
        if (level > user.level) {
            user.level = level;
        }

        // ✅ increment games played
        user.gamesPlayed += 1;

        // ✅ update high score
        if (score > user.highScore) {
            user.highScore = score;
        }

        await user.save();

        res.json({ message: "Score updated" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getLeaderboard = async (req, res) => {

    try {

        const leaderboard = await User.find()
            .sort({ score: -1 })
            .limit(10)
            .select("name score");

        res.json(leaderboard);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};