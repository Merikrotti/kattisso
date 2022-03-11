import React, {useState} from 'react';
import Cookies from "universal-cookie";
import { getUserData } from "../Authentication/UserAuthentication";

const Landing = (props) => {

    const [isLoading, setLoading] = useState(true);
    const [userData, setUserData] = useState();

    const cookies = new Cookies();

    const getUserInfo = () => {
        let cookie = cookies.get("accessToken");
        if(cookie === undefined) {
            setUserData("Unauthorized");
            setLoading(false);
        }
        getUserData(props.server, cookies.get("accessToken")).then(response => {
            if(response.status === 200) {
                response.json().then(json => {
                    let data = json;
                    setUserData(data);
                    setLoading(false);
                })
            } else {
                setUserData("Unauthorized");
                setLoading(false);
                cookies.remove("accessToken", { path: '/', sameSite: "lax", secure: true, domain: props.domainCookie, expires: new Date("January 1, 2030 01:00:00") });
            }
        });
    }

    if(isLoading) {
        getUserInfo();
        return <p>Loading...</p>
    }
    if(userData === "Unauthorized") {
        return (<div>
            <h1>Unauthorized</h1>
            <p>Good try I guess...?</p>
        </div>)
    }
    return(<div>
        <h1>Landing</h1>
        <h3>Hello, {userData.name}</h3>
    </div>);
}

export default Landing;