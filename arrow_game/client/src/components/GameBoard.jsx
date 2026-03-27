import React, { useState } from "react";
import ArrowCell from "./ArrowCell";
import { generateGrid } from "../utils/generateGrid";
import { saveScore } from "../api/gameApi";
import { getGridSize } from "../utils/levelConfig";




const GameBoard = () => {

    const savedLevel = Number(localStorage.getItem("level")) || 1;

    const [level, setLevel] = useState(savedLevel);
    const [gridSize, setGridSize] = useState(getGridSize(savedLevel));
    const [grid, setGrid] = useState(generateGrid(getGridSize(savedLevel)));
    const [chances, setChances] = useState(3);
    const [movingArrow, setMovingArrow] = useState(null);
    const [score, setScore] = useState(0);
    const [levelComplete, setLevelComplete] = useState(false);
    const [blast, setBlast] = useState(false);


    const token = localStorage.getItem("token");

    const checkPath = (row, col, direction) => {

        if (direction === "→") {
            for (let c = col + 1; c < gridSize; c++) {
                if (grid[row][c]) return false;
            }
        }

        if (direction === "←") {
            for (let c = col - 1; c >= 0; c--) {
                if (grid[row][c]) return false;
            }
        }

        if (direction === "↑") {
            for (let r = row - 1; r >= 0; r--) {
                if (grid[r][col]) return false;
            }
        }

        if (direction === "↓") {
            for (let r = row + 1; r < gridSize; r++) {
                if (grid[r][col]) return false;
            }
        }

        return true;
    };


    const getAnimation = (direction) => {

        const distance = 300;

        if (direction === "→") return { x: distance, opacity: 0 };
        if (direction === "←") return { x: -distance, opacity: 0 };
        if (direction === "↑") return { y: -distance, opacity: 0 };
        if (direction === "↓") return { y: distance, opacity: 0 };

        return {};
    };


    const handleClick = (row, col) => {

        const arrow = grid[row][col];

        if (!arrow) return;

        const clear = checkPath(row, col, arrow);

        if (!clear) {

            const newChance = chances - 1;
            setChances(newChance);

            if (newChance === 0) {
                alert("Level Restart");
                setGrid(generateGrid(gridSize));
                setChances(3);
            }

            return;
        }

        setMovingArrow({ row, col, direction: arrow });

        setTimeout(() => {

            const newGrid = [...grid];
            newGrid[row][col] = null;

            setGrid(newGrid);
            setMovingArrow(null);

            const win = checkWin(newGrid);

            if (win) {

                const newScore = score + level * 100;
                setScore(newScore);

                // 💥 BLAST EFFECT START
                // 💥 TRIGGER BLAST
                setBlast(true);

                setTimeout(() => {
                    setBlast(false);
                }, 600);
                // 💥 BLAST EFFECT END

                setLevelComplete(true);

                if (token) {
                    saveScore(newScore, level, token)
                        .then(() => console.log("Score saved"))
                        .catch(err => console.log(err));
                }
            }

        }, 600);

    };


    const checkWin = (gridData) => {

        for (let r = 0; r < gridSize; r++) {
            for (let c = 0; c < gridSize; c++) {

                if (gridData[r][c] !== null) {
                    return false;
                }

            }
        }

        return true;
    };


    return (

        <>
            {/* ✅ ADD THIS (animation definition) */}
            <style>
                {`
        @keyframes pop {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

       @keyframes flash {
  0% { opacity: 1; transform: scale(1); }
50% { opacity: 0.8; transform: scale(1); }
  100% { opacity: 0; transform: scale(1.5); }
}
        `}
            </style>

            {blast && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "white",
                    zIndex: 998,
                    animation: "flash 0.3s ease"
                }} />
            )}

            <div style={{ textAlign: "center" }}>

                <h2>Level: {level}</h2>
                <h2>Chances: {chances}</h2>
                <h3>Score: {score}</h3>

                {levelComplete && (
                    <div style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0,0,0,0.8)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 999
                    }}>
                        <div style={{
                            background: "radial-gradient(circle, yellow 0%, orange 40%, red 100%)",
                            padding: "40px",
                            borderRadius: "20px",
                            textAlign: "center",
                            animation: "flash 0.6s ease",
                            color: "#333"
                        }}>
                            <h1>🎉 Level Complete!</h1>
                            <h3>Score: {score}</h3>

                            <button
                                onClick={() => {

                                    const nextLevel = level + 1;

                                    setLevel(nextLevel);

                                    localStorage.setItem("level", nextLevel);

                                    const newSize = getGridSize(nextLevel);

                                    setGridSize(newSize);

                                    setGrid(generateGrid(newSize));

                                    setChances(3);
                                    setLevelComplete(false);

                                }}
                                style={{
                                    padding: "10px 20px",
                                    fontSize: "16px",
                                    marginTop: "15px",
                                    cursor: "pointer"
                                }}
                            >
                                Next Level 🚀
                            </button>
                        </div>
                    </div>
                )}


                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${gridSize}, 70px)`,
                        justifyContent: "center"
                    }}
                >

                    {grid.map((row, r) =>
                        row.map((cell, c) => {

                            const isMoving =
                                movingArrow &&
                                movingArrow.row === r &&
                                movingArrow.col === c;

                            return (
                                <ArrowCell
                                    key={`${r}-${c}`}
                                    arrow={cell}
                                    onClick={() => handleClick(r, c)}
                                    move={isMoving ? getAnimation(cell) : {}}
                                />
                            );

                        })
                    )}

                </div>

            </div>
        </>
    );

};

export default GameBoard;