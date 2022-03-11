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
import Redirect from "./Authentication/Redirect";

const config = require("./config.json");

const server = config.server;
const domainCookie = config.domainCookie;

const AppRoutes = (props) => {
    const [redirect, setRedirect] = useState("");
    const [isAuthenticated, setAuthenticated] = useState(false);
    

    const isUserAuthenticated = (token) => {
        getUserData(server, token).then(response => {
            if(response.status === 200) {
                setAuthenticated(true);
            } else {
                console.log("Not authenticated")
            }
        });
    }
    useEffect(() => {
        const cookies = new Cookies();
        
        if (cookies.get("accessToken") !== undefined && !isAuthenticated) {
            let token = cookies.get("accessToken");
            isUserAuthenticated(token);
        }
    }, [isAuthenticated])

    const handleRedirect = () => {
        console.log("redirecting");
        window.location.href = redirect;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App isAuthenticated={isAuthenticated}/>}>
                    <Route path="/" element={<Index isAuthenticated={isAuthenticated}/>}/>
                    <Route path="login" element={<Login server={server} setAuthenticated={setAuthenticated} handleRedirect={handleRedirect} redirect={redirect} domainCookie={domainCookie}/>} />
                    <Route path="register" element={<Register server={server}/>} />
                    <Route path="landing" element={<Landing server={server} domainCookie={domainCookie}/>} />
                    <Route path="logout" element={<Logout setAuthenticated={setAuthenticated} domainCookie={domainCookie}/>} />
                    <Route path="privacy" element={<Privacy/>} />
                    <Route path="redirect" element={<Redirect setRedirect={setRedirect}/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );

    
}

export default AppRoutes;