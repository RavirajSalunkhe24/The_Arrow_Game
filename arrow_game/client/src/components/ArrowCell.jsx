import React from "react";
import { motion } from "framer-motion";

const ArrowCell = ({ arrow, onClick, move }) => {

    return (
        <div
            style={{
                width: 70,
                height: 70,
                border: "1px solid #ccc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#fff",
                color: "#333",
            }}
            onClick={onClick}
        >

            {arrow && (
                <motion.div
                    animate={move}
                    transition={{ duration: 0.6 }}
                    style={{
                        fontSize: "28px",
                        cursor: "pointer"
                    }}
                >
                    {arrow}
                </motion.div>
            )}

        </div>
    );
};

export default ArrowCell;