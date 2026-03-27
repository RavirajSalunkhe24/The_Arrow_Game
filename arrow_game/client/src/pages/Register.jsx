import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/register`,
                { name, email, password }
            );

            localStorage.setItem("token", res.data.token);
            navigate("/login");
        } catch (error) {
            alert("Registration failed");
        } finally {
            setIsLoading(false);
        }
    };

    // Arrow icon SVG
    const ArrowIcon = () => (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4L12 20M12 20L18 14M12 20L6 14" stroke="#ffd700" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                position: "relative",
                overflow: "hidden"
            }}
        >
            {/* Animated background elements */}
            <div style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                opacity: "0.1"
            }}>
                {[...Array(5)].map((_, i) => (
                    <div key={i} style={{
                        position: "absolute",
                        width: "200px",
                        height: "200px",
                        border: "2px solid white",
                        borderRadius: "50%",
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `float ${15 + i * 5}s infinite linear`,
                        opacity: 0.3
                    }} />
                ))}
            </div>

            {/* Main content */}
            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    width: "100%",
                    maxWidth: "400px",
                    padding: "20px"
                }}
            >
                {/* Game Title with Arrow */}
                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "30px",
                        animation: "slideDown 0.8s ease-out"
                    }}
                >
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        marginBottom: "5px"
                    }}>
                        <ArrowIcon />
                        <h1 style={{
                            color: "white",
                            fontSize: "clamp(2rem, 8vw, 3rem)",
                            fontWeight: "800",
                            textTransform: "uppercase",
                            letterSpacing: "4px",
                            textShadow: "3px 3px 0 rgba(0,0,0,0.2)",
                            margin: 0
                        }}>
                            THE ARROW GAME
                        </h1>
                        <ArrowIcon />
                    </div>
                    <p style={{
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "1rem",
                        letterSpacing: "2px",
                        fontWeight: "300"
                    }}>
                        Join the adventure
                    </p>
                </div>

                {/* Register Form */}
                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                        padding: "40px",
                        background: "rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "20px",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        animation: "slideUp 0.8s ease-out"
                    }}
                >
                    <h2 style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: "2rem",
                        fontWeight: "600",
                        margin: "0 0 10px 0",
                        textShadow: "2px 2px 0 rgba(0,0,0,0.2)"
                    }}>
                        Register
                    </h2>

                    <input
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{
                            padding: "15px 20px",
                            border: "none",
                            borderRadius: "12px",
                            background: "rgba(255,255,255,0.9)",
                            fontSize: "16px",
                            outline: "none",
                            transition: "all 0.3s ease",
                            boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
                        }}
                        onFocus={(e) => {
                            e.target.style.transform = "scale(1.02)";
                            e.target.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
                        }}
                        onBlur={(e) => {
                            e.target.style.transform = "scale(1)";
                            e.target.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
                        }}
                    />

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            padding: "15px 20px",
                            border: "none",
                            borderRadius: "12px",
                            background: "rgba(255,255,255,0.9)",
                            fontSize: "16px",
                            outline: "none",
                            transition: "all 0.3s ease",
                            boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
                        }}
                        onFocus={(e) => {
                            e.target.style.transform = "scale(1.02)";
                            e.target.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
                        }}
                        onBlur={(e) => {
                            e.target.style.transform = "scale(1)";
                            e.target.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
                        }}
                    />

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                        style={{
                            padding: "15px 20px",
                            border: "none",
                            borderRadius: "12px",
                            background: "rgba(255,255,255,0.9)",
                            fontSize: "16px",
                            outline: "none",
                            transition: "all 0.3s ease",
                            boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
                        }}
                        onFocus={(e) => {
                            e.target.style.transform = "scale(1.02)";
                            e.target.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
                        }}
                        onBlur={(e) => {
                            e.target.style.transform = "scale(1)";
                            e.target.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
                        }}
                    />

                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            padding: "15px 20px",
                            border: "none",
                            borderRadius: "12px",
                            background: "linear-gradient(45deg, #ffd700, #ffb347)",
                            color: "#333",
                            fontSize: "18px",
                            fontWeight: "600",
                            cursor: isLoading ? "not-allowed" : "pointer",
                            transition: "all 0.3s ease",
                            boxShadow: "0 5px 15px rgba(255,215,0,0.3)",
                            marginTop: "10px",
                            opacity: isLoading ? 0.7 : 1,
                            transform: isLoading ? "none" : "translateY(0)"
                        }}
                        onMouseEnter={(e) => {
                            if (!isLoading) {
                                e.target.style.transform = "translateY(-2px)";
                                e.target.style.boxShadow = "0 8px 20px rgba(255,215,0,0.4)";
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isLoading) {
                                e.target.style.transform = "translateY(0)";
                                e.target.style.boxShadow = "0 5px 15px rgba(255,215,0,0.3)";
                            }
                        }}
                    >
                        {isLoading ? "Creating Account..." : "Create Account"}
                    </button>

                    <p style={{
                        textAlign: "center",
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "0.9rem",
                        marginTop: "10px"
                    }}>
                        Already have an account?{" "}
                        <span
                            onClick={() => navigate("/login")}
                            style={{
                                color: "#ffd700",
                                fontWeight: "600",
                                cursor: "pointer",
                                textDecoration: "underline"
                            }}
                        >
                            Login
                        </span>
                    </p>
                </form>
            </div>

            {/* Add keyframe animations */}
            <style>
                {`
                    @keyframes float {
                        0% { transform: rotate(0deg) translate(0, 0); }
                        100% { transform: rotate(360deg) translate(100px, 100px); }
                    }
                    @keyframes slideDown {
                        0% { opacity: 0; transform: translateY(-50px); }
                        100% { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes slideUp {
                        0% { opacity: 0; transform: translateY(50px); }
                        100% { opacity: 1; transform: translateY(0); }
                    }
                    @media (max-width: 480px) {
                        form { padding: 30px !important; }
                        h1 { font-size: 2rem !important; }
                    }
                `}
            </style>
        </div>
    );
};

export default Register;