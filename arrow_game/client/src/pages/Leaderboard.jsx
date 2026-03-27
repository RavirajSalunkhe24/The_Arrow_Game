import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Leaderboard = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/game/leaderboard`
                );
                setPlayers(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    // Arrow icon SVG
    const ArrowIcon = () => (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4L12 20M12 20L18 14M12 20L6 14" stroke="#ffd700" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                position: "relative",
                overflow: "auto",
                padding: "20px",
                boxSizing: "border-box",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start"
            }}
        >
            {/* Simple background decoration */}
            <div style={{
                position: "fixed",
                width: "100%",
                height: "100%",
                opacity: 0.1,
                pointerEvents: "none",
                top: 0,
                left: 0
            }}>
                <div style={{
                    position: "absolute",
                    width: "300px",
                    height: "300px",
                    border: "2px solid white",
                    borderRadius: "50%",
                    right: "-100px",
                    bottom: "-100px"
                }} />
                <div style={{
                    position: "absolute",
                    width: "200px",
                    height: "200px",
                    border: "2px solid white",
                    borderRadius: "50%",
                    left: "-50px",
                    top: "-50px"
                }} />
            </div>

            {/* Main content */}
            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    width: "100%",
                    maxWidth: "600px"
                }}
            >
                {/* Header with Back Button and Title */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "20px"
                }}>
                    <button
                        onClick={() => navigate(-1)}
                        style={{
                            padding: "8px 15px",
                            background: "rgba(255,255,255,0.1)",
                            border: "1px solid rgba(255,255,255,0.3)",
                            borderRadius: "8px",
                            color: "white",
                            fontSize: "0.9rem",
                            cursor: "pointer",
                            backdropFilter: "blur(5px)",
                            display: "flex",
                            alignItems: "center",
                            gap: "5px"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                        }}
                    >
                        ← Back
                    </button>

                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px"
                    }}>
                        <ArrowIcon />
                        <h1 style={{
                            color: "white",
                            fontSize: "1.5rem",
                            fontWeight: 800,
                            textTransform: "uppercase",
                            letterSpacing: "2px",
                            textShadow: "2px 2px 0 rgba(0,0,0,0.2)",
                            margin: 0
                        }}>
                            THE ARROW GAME
                        </h1>
                        <ArrowIcon />
                    </div>

                    <div style={{ width: "60px" }} /> {/* Spacer */}
                </div>

                {/* Leaderboard Card */}
                <div
                    style={{
                        background: "rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "15px",
                        border: "1px solid rgba(255,255,255,0.2)",
                        padding: "25px",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
                    }}
                >
                    {/* Leaderboard Title */}
                    <div style={{
                        textAlign: "center",
                        marginBottom: "20px"
                    }}>
                        <h2 style={{
                            color: "#ffd700",
                            fontSize: "2rem",
                            margin: "0 0 5px 0",
                            fontWeight: 700,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "10px"
                        }}>
                            <span>🏆</span> Leaderboard <span>🏆</span>
                        </h2>
                        <p style={{
                            color: "rgba(255,255,255,0.8)",
                            fontSize: "0.9rem",
                            margin: 0
                        }}>
                            Top players ranking
                        </p>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div style={{
                            textAlign: "center",
                            padding: "40px",
                            color: "white"
                        }}>
                            Loading leaderboard...
                        </div>
                    )}

                    {/* No Players State */}
                    {!loading && players.length === 0 && (
                        <div style={{
                            textAlign: "center",
                            padding: "40px",
                            color: "white"
                        }}>
                            <p style={{ fontSize: "1.2rem", marginBottom: "10px" }}>📊 No scores yet</p>
                            <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>Be the first to play!</p>
                        </div>
                    )}

                    {/* Leaderboard Table */}
                    {!loading && players.length > 0 && (
                        <div style={{
                            overflowX: "auto"
                        }}>
                            <table
                                style={{
                                    width: "100%",
                                    borderCollapse: "collapse",
                                    color: "white"
                                }}
                            >
                                <thead>
                                    <tr style={{
                                        borderBottom: "2px solid rgba(255,215,0,0.3)"
                                    }}>
                                        <th style={{
                                            padding: "12px 8px",
                                            textAlign: "center",
                                            color: "#ffd700",
                                            fontSize: "1rem",
                                            fontWeight: 600
                                        }}>Rank</th>
                                        <th style={{
                                            padding: "12px 8px",
                                            textAlign: "left",
                                            color: "#ffd700",
                                            fontSize: "1rem",
                                            fontWeight: 600
                                        }}>Player</th>
                                        <th style={{
                                            padding: "12px 8px",
                                            textAlign: "right",
                                            color: "#ffd700",
                                            fontSize: "1rem",
                                            fontWeight: 600
                                        }}>Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {players.map((player, index) => (
                                        <tr
                                            key={player._id}
                                            style={{
                                                borderBottom: index < players.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
                                                transition: "all 0.2s ease",
                                                background: index === 0 ? "rgba(255,215,0,0.1)" : "transparent"
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = index === 0 ? "rgba(255,215,0,0.1)" : "transparent";
                                            }}
                                        >
                                            <td style={{
                                                padding: "12px 8px",
                                                textAlign: "center",
                                                fontWeight: 600
                                            }}>
                                                {index === 0 && "🥇"}
                                                {index === 1 && "🥈"}
                                                {index === 2 && "🥉"}
                                                {index > 2 && `#${index + 1}`}
                                            </td>
                                            <td style={{
                                                padding: "12px 8px",
                                                textAlign: "left",
                                                fontWeight: 500
                                            }}>
                                                {player.name}
                                            </td>
                                            <td style={{
                                                padding: "12px 8px",
                                                textAlign: "right",
                                                fontWeight: 700,
                                                color: "#ffd700"
                                            }}>
                                                {player.score?.toLocaleString() || 0}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Play Button */}
                    <div style={{
                        marginTop: "25px",
                        textAlign: "center"
                    }}>
                        <button
                            onClick={() => navigate("/game")}
                            style={{
                                padding: "12px 30px",
                                border: "none",
                                borderRadius: "8px",
                                background: "linear-gradient(45deg, #ffd700, #ffb347)",
                                color: "#333",
                                fontSize: "1rem",
                                fontWeight: 600,
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-2px)";
                                e.currentTarget.style.boxShadow = "0 5px 15px rgba(255,215,0,0.3)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                        >
                            <span>🎯</span> Play Now
                        </button>
                    </div>
                </div>

                {/* Footer Note */}
                <p style={{
                    textAlign: "center",
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "0.8rem",
                    marginTop: "15px"
                }}>
                    Compete with players worldwide
                </p>
            </div>
        </div>
    );
};

export default Leaderboard;