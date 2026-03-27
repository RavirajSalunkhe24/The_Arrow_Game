import React from "react";
import GameBoard from "../components/GameBoard";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";

const Game = () => {
    const navigate = useNavigate();
    const level = "medium"; // This can be dynamic later

    const sizeMap = {
        easy: 3,
        medium: 5,
        hard: 7
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                padding: "20px",
                boxSizing: "border-box",
                color: "white",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
            }}
        >
            {/* Header Section */}
            <div style={{ textAlign: "center", marginBottom: "30px", marginTop: "20px" }}>
                <h1 style={{
                    fontSize: "clamp(1.5rem, 6vw, 2.5rem)",
                    fontWeight: "800",
                    textTransform: "uppercase",
                    letterSpacing: "4px",
                    textShadow: "3px 3px 0 rgba(0,0,0,0.2)",
                    margin: "0 0 10px 0"
                }}>
                    THE ARROW GAME
                </h1>
                <div style={{
                    display: "inline-block",
                    padding: "5px 20px",
                    background: "rgba(255,215,0,0.2)",
                    borderRadius: "20px",
                    border: "1px solid #ffd700",
                    fontSize: "0.9rem",
                    color: "#ffd700",
                    textTransform: "uppercase",
                    letterSpacing: "2px"
                }}>
                    Level: {level}
                </div>
            </div>

            {/* Game Board Container (Glassmorphism effect) */}
            <div style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(12px)",
                borderRadius: "24px",
                padding: "30px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.2)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
                maxWidth: "100%",
                marginBottom: "30px"
            }}>
                <GameBoard size={sizeMap[level]} />
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "15px" }}>
                <button
                    onClick={() => navigate("/leaderboard")}
                    style={{
                        padding: "12px 25px",
                        background: "linear-gradient(45deg, #ffd700, #ffb347)",
                        color: "#333",
                        border: "none",
                        borderRadius: "12px",
                        fontSize: "1rem",
                        fontWeight: "700",
                        cursor: "pointer",
                        boxShadow: "0 5px 15px rgba(255,215,0,0.3)",
                        transition: "transform 0.2s"
                    }}
                    onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                    onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                >
                    🏆 Leaderboard
                </button>

                <button
                    onClick={() => navigate("/dashboard")}
                    style={{
                        padding: "12px 25px",
                        background: "rgba(255,255,255,0.1)",
                        color: "white",
                        border: "1px solid rgba(255,255,255,0.3)",
                        borderRadius: "12px",
                        fontSize: "1rem",
                        fontWeight: "500",
                        cursor: "pointer",
                        backdropFilter: "blur(5px)"
                    }}
                >
                    Exit Game
                </button>
            </div>
        </div>
    );
};

export default Game;