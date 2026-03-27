import axios from "axios";
import * as React from "react";
const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

console.log("API URL:", import.meta.env.VITE_API_URL);
export const saveScore = async (score, level, token) => {

    return API.post(
        "/game/score",
        { score, level },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

};