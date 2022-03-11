import { BrowserRouter, Routes, Route, } from "react-router-dom";
import App from './App';
import Index from "./Pages/Index";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import React, {useState} from 'react';
import Privacy from "./Pages/Privacy";

const config = require("./config.json");

const server = config.server;
const domainCookie = config.domainCookie;

const AppRoutes = (props) => {
    const [accessToken, setAccessToken] = useState();
    const [redirect, setRedirect] = useState("");

    const handleRedirect = () => {
        window.location.href = redirect;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route path="/" element={<Index/>}/>
                    <Route path="login" element={<Login server={server} setAccessToken={setAccessToken} handleRedirect={handleRedirect} redirect={redirect} domainCookie={domainCookie}/>} />
                    <Route path="register" element={<Register server={server}/>} />
                    <Route path="landing" element={<Landing server={server} accessToken={accessToken}/>} />
                    <Route path="privacy" element={<Privacy/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;