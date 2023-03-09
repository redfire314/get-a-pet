import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function useAuth() {
    const [token, setToken] = useState(true);
    const navigate = useNavigate();

    // TO DO: Check if token is valid with api request
    useEffect(() => {
        const value = localStorage.getItem("token");
        value ? setToken(true) : setToken(false);
    }, [localStorage.getItem("token")]);

    // Checks if user are authenticated by token
    const checkAuth = () => {
        // Checks if token are stored in local storage
        // If it's stored, user are authenticated
        return token;
    };

    // Removes token from local storage and setToken to false
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    // Sends a request for user creation
    const register = async (name, email, phone, zip, password, password2) => {
        const { userCreate } = api();
        const response = await userCreate({
            name,
            email,
            phone,
            zip,
            password,
            password2,
        });

        // TO DO: Flash message
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            navigate("/");
        } else {
            console.log(response.data.message);
        }
    };

    // Checks if user exists on database
    const login = async (email, password) => {
        const { userLogin } = api();
        const response = await userLogin({ email, password });

        // TO DO: Flash message
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            navigate("/");
        } else {
            console.log(response.data.message);
        }
    };

    // Get user info on database
    const profile = async () => {
        const { userProfile } = api();
        const token = localStorage.getItem("token");
        const response = await userProfile(token);
        return response;
    };

    const update = async (name, email, phone, zip, password, password2) => {
        const { userUpdate } = api();
        const token = localStorage.getItem("token");
        const data = {
            info: {
                name,
                email,
                phone,
                zip,
                password,
                password2,
            },
            token,
        };

        const response = await userUpdate(data);
        // TO DO: Flash message
    };

    return { checkAuth, logout, register, login, profile, update };
}

export default useAuth;
