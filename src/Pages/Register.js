import "../App.css";
import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

const Register = (props) => {

    const [formInfo, setFormInfo] = useState({});
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

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
        if(Object.keys(formInfo).length !== 3) {
            newErrors[0] = "Fill the fields.";
            setErrors([...newErrors]);
            return;
        }

        if(formInfo["password"] !== formInfo["confirmpassword"]) {
            newErrors[0] = "Passwords must match";
            setErrors([...newErrors]);
            return;
        }

        fetch(props.server + "register", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(formInfo)
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log("success");
                    return navigate("/login");
                }
                
                if (response.status === 409) {
                    newErrors[0] = "User already exists";
                }
                if (response.status === 400) {
                    newErrors[0] = "Illegal characters or illegal request";
                }
                setErrors([...newErrors]);
            })
    }

    return (<div className="form">
        <h1>Register</h1>
        <form onSubmit={onSubmit}>
            <p>
                <label htmlFor="username">Username: <input onChange={changeFormInfo} id="username" type="text"></input></label>
            </p>
            <p>
                <label htmlFor="password">Password: <input onChange={changeFormInfo} id="password" type="password"></input></label>
            </p>
            <p>
                <label htmlFor="confirmpassword">Confirm password: <input onChange={changeFormInfo} id="confirmpassword" type="password"></input></label>
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

export default Register;