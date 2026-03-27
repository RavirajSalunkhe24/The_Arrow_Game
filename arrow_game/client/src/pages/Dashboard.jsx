import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is authenticated and fetch user data
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        // Fetch user data from backend
        const fetchUserData = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/auth/me`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                console.log(res.data);
                setUserData(res.data);
            } catch (error) {
                console.error("Failed to fetch user data");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    const startGame = () => {
        navigate("/game");
    };

    const openLeaderboard = () => {
        navigate("/leaderboard");
    };

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    // Arrow icon SVG
    const ArrowIcon = () => (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4L12 20M12 20L18 14M12 20L6 14" stroke="#ffd700" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    return (
        <div
            style={{
                height: "100vh",
                width: "100%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            {/* Simple background decoration */}
            <div style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                opacity: 0.1,
                pointerEvents: "none"
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

            {/* Main content - Compact size */}
            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    width: "90%",
                    maxWidth: "400px"
                }}
            >
                {/* Game Title - Smaller */}
                <div style={{
                    textAlign: "center",
                    marginBottom: "20px"
                }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px"
                    }}>
                        <ArrowIcon />
                        <h1 style={{
                            color: "white",
                            fontSize: "1.8rem",
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
                </div>

                {/* Dashboard Card - Compact */}
                <div
                    style={{
                        background: "rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "15px",
                        border: "1px solid rgba(255,255,255,0.2)",
                        padding: "20px",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
                    }}
                >
                    {/* Welcome Message - Compact */}
                    <div style={{
                        textAlign: "center",
                        marginBottom: "15px"
                    }}>
                        <h2 style={{
                            color: "#ffd700",
                            fontSize: "1.3rem",
                            margin: "0 0 5px 0",
                            fontWeight: 600
                        }}>
                            {loading ? "Loading..." : `Welcome ${userData?.name || 'Player'}!`}
                        </h2>
                        <p style={{
                            color: "rgba(255,255,255,0.8)",
                            fontSize: "0.9rem",
                            margin: 0
                        }}>
                            Ready to play?
                        </p>
                    </div>

                    {/* Stats - Only if data available */}
                    {!loading && userData && (
                        <div style={{
                            display: "flex",
                            gap: "10px",
                            justifyContent: "center",
                            marginBottom: "20px"
                        }}>
                            <div style={{
                                background: "rgba(255,255,255,0.05)",
                                padding: "8px",
                                borderRadius: "8px",
                                textAlign: "center",
                                flex: 1,
                                border: "1px solid rgba(255,255,255,0.1)"
                            }}>
                                <div style={{ color: "#ffd700", fontSize: "1.2rem" }}>🎮</div>
                                <div style={{ color: "white", fontSize: "0.7rem" }}>Games</div>
                                <div style={{ color: "#ffd700", fontSize: "1rem", fontWeight: 700 }}>
                                    {userData.gamesPlayed || 0}
                                </div>
                            </div>
                            <div style={{
                                background: "rgba(255,255,255,0.05)",
                                padding: "8px",
                                borderRadius: "8px",
                                textAlign: "center",
                                flex: 1,
                                border: "1px solid rgba(255,255,255,0.1)"
                            }}>
                                <div style={{ color: "#ffd700", fontSize: "1.2rem" }}>🏆</div>
                                <div style={{ color: "white", fontSize: "0.7rem" }}>High Score</div>
                                <div style={{ color: "#ffd700", fontSize: "1rem", fontWeight: 700 }}>
                                    {userData.highScore || 0}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons - Compact */}
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px"
                    }}>
                        <button
                            onClick={startGame}
                            style={{
                                padding: "12px",
                                border: "none",
                                borderRadius: "8px",
                                background: "linear-gradient(45deg, #ffd700, #ffb347)",
                                color: "#333",
                                fontSize: "1rem",
                                fontWeight: 600,
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-1px)";
                                e.currentTarget.style.boxShadow = "0 5px 15px rgba(255,215,0,0.3)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                        >
                            <span>🎯</span> Start Game
                        </button>

                        <button
                            onClick={openLeaderboard}
                            style={{
                                padding: "12px",
                                border: "1px solid rgba(255,255,255,0.3)",
                                borderRadius: "8px",
                                background: "rgba(255,255,255,0.1)",
                                color: "white",
                                fontSize: "1rem",
                                fontWeight: 600,
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                            }}
                        >
                            <span>🏆</span> Leaderboard
                        </button>

                        <button
                            onClick={logout}
                            style={{
                                padding: "12px",
                                border: "1px solid rgba(255,99,99,0.3)",
                                borderRadius: "8px",
                                background: "rgba(255,99,99,0.1)",
                                color: "#ff9999",
                                fontSize: "1rem",
                                fontWeight: 600,
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px",
                                marginTop: "5px"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(255,99,99,0.2)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "rgba(255,99,99,0.1)";
                            }}
                        >
                            <span>🚪</span> Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;