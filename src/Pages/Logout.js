import React, {useEffect} from 'react';
import Cookies from "universal-cookie";

const Logout = (props) => {

    const cookies = new Cookies();

    useEffect(() => {
        cookies.remove("accessToken", { path: '/', sameSite: "lax", secure: true, domain: props.domainCookie, expires: new Date("January 1, 2030 01:00:00") });
        props.setAuthenticated(false);
    }, [])
    return(<div>
        <h1>Logged out</h1>
    </div>);
}

export default Logout;