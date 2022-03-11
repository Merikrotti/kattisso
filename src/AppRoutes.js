import { BrowserRouter, Routes, Route, } from "react-router-dom";
import App from './App';
import Index from "./Pages/Index";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Logout from "./Pages/Logout"
import React, {useEffect, useState} from 'react';
import Privacy from "./Pages/Privacy";
import Cookies from "universal-cookie";
import { getUserData } from "./Authentication/UserAuthentication";

const config = require("./config.json");

const server = config.server;
const domainCookie = config.domainCookie;

const AppRoutes = (props) => {
    const [redirect, setRedirect] = useState("");
    const [isAuthenticated, setAuthenticated] = useState(false);
    const cookies = new Cookies();

    const isUserAuthenticated = (token) => {
        console.log("dumb server sending requests");
        getUserData(server, token).then(response => {
            if(response.status === 200) {
                setAuthenticated(true);
            } else {
                console.log("Not authenticated")
            }
        });
    }
    useEffect(() => {
        if (cookies.get("accessToken") !== undefined && !isAuthenticated) {
            let token = cookies.get("accessToken");
            isUserAuthenticated(token);
        }
    }, [])

    const handleRedirect = () => {
        window.location.href = redirect;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App isAuthenticated={isAuthenticated}/>}>
                    <Route path="/" element={<Index isAuthenticated={isAuthenticated}/>}/>
                    <Route path="login" element={<Login server={server} setAuthenticated={setAuthenticated} handleRedirect={handleRedirect} redirect={redirect} domainCookie={domainCookie}/>} />
                    <Route path="register" element={<Register server={server}/>} />
                    <Route path="landing" element={<Landing server={server}/>} />
                    <Route path="logout" element={<Logout setAuthenticated={setAuthenticated}/>} />
                    <Route path="privacy" element={<Privacy/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );

    
}

export default AppRoutes;