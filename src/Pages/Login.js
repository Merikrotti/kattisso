import "../App.css";
import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const Login = (props) => {
    const [formInfo, setFormInfo] = useState({});
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const cookies = new Cookies();

    const changeFormInfo = (event) => {
        let newerrors = errors;
        newerrors.splice(0);
        if(event.target.id === "username") {
            if(event.target.value.length < 5) {
                newerrors[1] = "Username must be over 4 characters";
            } else if (!event.target.value.match(/^[A-Za-z0-9]+$/)) {
                newerrors[1] = "No special characters";
            } else {
                newerrors.splice(1);
            }
        }
        if(event.target.id === "password") {
            if(event.target.value.length < 7) {
                newerrors[2] = "Passwords must be over 6 characters";
            } else {
                newerrors.splice(2);
            }
        }
        setErrors([...newerrors]);
        let newInfo = formInfo;
        newInfo[event.target.id] = event.target.value;
        setFormInfo(newInfo);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        let newErrors = errors;
        if(errors.length > 0) {
            newErrors[0] = "Please fix existing errors.";
            setErrors([...newErrors]);
            return;
        }
        if(Object.keys(formInfo).length !== 2) {
            newErrors[0] = "Fill the fields.";
            setErrors([...newErrors]);
            return;
        }

        fetch(props.server + "login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(formInfo)
        })
            .then((response) => {
                if (response.status === 200) {
                    response.json()
                        .then(function(json) {
                            let data = json.accessToken;
                            props.setAccessToken(data);
                            cookies.set('accessToken', data, { path: '/', sameSite: "strict", domain: props.cookieDomain, expires: new Date("January 1, 2030 01:00:00") });
                            if(props.redirect === "")
                                navigate("/landing");
                            else
                                props.handleRedirect();
                        });
                    
                }
                
                if (response.status === 401) {
                    newErrors[0] = "Username or password is wrong";
                }
                if (response.status === 400) {
                    newErrors[0] = "Illegal characters or illegal request";
                }
                setErrors([...newErrors]);
            })
    }

    return (<div className="form">
        <h1>Login</h1>
        {props.redirect !== "" && <h5>Redirecting you to: {props.redirect}</h5>}
        <form onSubmit={onSubmit}>
            <p>
                <label htmlFor="username">Username: <input onChange={changeFormInfo} id="username" type="text"></input></label>
            </p>
            <p>
                <label htmlFor="password">Password: <input onChange={changeFormInfo} id="password" type="password"></input></label>
            </p>
            <p id="submit"><input className="btn btn-primary" type="submit" value="Submit"></input></p>
            
        </form>
        <ul>
            {errors.map((e, i) => {
                if(e !== undefined)
                    return (<li key={i}>{e}</li>);
            })}
        </ul>
        </div>)
}

export default Login;