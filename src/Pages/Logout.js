import {useEffect, useContext} from 'react';
import Cookies from "universal-cookie";
import { AuthContext } from "../Authentication/Authentication";

const Logout = (props) => {

    const {isAuthenticated, reset} = useContext(AuthContext);

    useEffect(() => {
        //Remove access and refresh tokens
        if(!isAuthenticated)
            return;
        const cookies = new Cookies();
        cookies.remove("accessToken", { path: '/', sameSite: "lax", secure: true, domain: props.domainCookie, expires: new Date("January 1, 2030 01:00:00") });
        cookies.remove('refreshToken', { path: '/', sameSite: "lax", secure: true, domain: props.domainCookie, expires: new Date("January 1, 2030 01:00:00") });
        fetch(props.server + "logout")
        reset()
    }, [reset, isAuthenticated])


    if(isAuthenticated) {

        return <div>
            <h1>Logging out...</h1>
        </div>
    }
    return(<div>
        <h1>Logged out</h1>
    </div>);
}

export default Logout;