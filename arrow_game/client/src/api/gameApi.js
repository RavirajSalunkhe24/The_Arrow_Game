import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api"
});

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