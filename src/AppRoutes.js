import { BrowserRouter, Routes, Route, } from "react-router-dom";
import App from './App';
import Index from "./Pages/Index";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Logout from "./Pages/Logout"
import Linking from "./Pages/Linking";
import React, {useState} from 'react';
import Privacy from "./Pages/Privacy";
import Redirect from "./Authentication/Redirect";
import AuthContextProvider from "./Authentication/Authentication"
import RoleList from "./Pages/RoleList";


const config = require("./config.json");

const server = config.server;
const domainCookie = config.domainCookie;


const AppRoutes = (props) => {
    const [redirect, setRedirect] = useState("");

    const handleRedirect = () => {
        console.log("redirecting");
        window.location.href = redirect;
    }

    return (
        <AuthContextProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route path="/" element={<Index/>}/>
                    <Route path="login" element={<Login server={server} handleRedirect={handleRedirect} redirect={redirect} domainCookie={domainCookie}/>} />
                    <Route path="register" element={<Register server={server}/>} />
                    <Route path="landing" element={<Landing server={server} domainCookie={domainCookie}/>} />
                    <Route path="logout" element={<Logout domainCookie={domainCookie}/>} />
                    <Route path="privacy" element={<Privacy/>} />
                    <Route path="redirect" element={<Redirect setRedirect={setRedirect}/>} />
                    <Route path="rolelist" element={<RoleList server={server}/>} />
                    <Route path="linking" element={<Linking server={server}/>} />
                </Route>
            </Routes>
        </BrowserRouter>
        </AuthContextProvider>
    );

    
}

export default AppRoutes;