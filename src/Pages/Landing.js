import React, {useState} from 'react';
import Cookies from "universal-cookie";

const Landing = (props) => {

    const [isLoading, setLoading] = useState(true);
    const [userData, setUserData] = useState({});

    const cookies = new Cookies();

    const getUserInfo = () => {
        fetch(props.server + "GetAccountData", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + cookies.get("accessToken")
            }})
            .then(response => {
                if(response.status === 200) {
                    response.json()
                        .then(json => {
                            let data = json;
                            setUserData(data);
                            console.log(data);
                        });
                }
            })
            .finally(setLoading(false));
            
    }

    if(isLoading) {
        getUserInfo();
        return <p>Loading...</p>
    }
    if(!isLoading && userData === {}) {
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