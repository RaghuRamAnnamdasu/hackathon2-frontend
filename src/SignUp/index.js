import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../global";

import "../Login/login.css";

export function SignUp() {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[displayName, setDisplayName] = useState("");
    const[emailError, setEmailError] = useState("");
    const navigate = useNavigate();

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const onDisplayNameChange = (e) => {
        setDisplayName(e.target.value);
    }

    function isEmailValid() {
        const emailRegexp = new RegExp(
          /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
        );
        if(email.length < 8) {
            setEmailError("Email should be maximum of 8 characters");
        } else if(!emailRegexp.test(email)) {
            setEmailError("Enter a Valid Email Address");
        } else {
            setEmailError("");
        }
    }

    const onSignUp = (e) => {
        var data = [{
            email: email,
            password: password,
            displayName: displayName
        }];
        fetch(`${API}/user/signup`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"content-type": "application/json"}
        }).then(response => {
            return response.json();
          }).then(jsonResponse => {
            if(jsonResponse.message) {
                setEmailError(jsonResponse.message);
            } else {

             navigate("/questions");
             localStorage.setItem("user", JSON.stringify({token: "", userName: displayName}));
            }
          }).catch (error => {
            console.log(error)
          })
        // .then((response) => {
        //     console.log("response", response);
        //     if(response.message) {
        //         setEmailError(response.message);
        //     }
        //    if(response.status === 404 || response.status === 401 || response.status === 400) {
        //         if(response.message) {
        //             setEmailError(response.message);
        //         }
        //         console.log("error");
        //     } else {
        //         navigate("/users/login");
        //     }
        // }).catch((error) => {
        //     console.log("error", error);
        // })
        e.preventDefault();
    };

    return (
        <div className="login">
            <div className="iconWrapper">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stack_Overflow_icon.svg/512px-Stack_Overflow_icon.svg.png" alt="" />
            </div>
            <form className="loginContent" onSubmit={(e) => onSignUp(e)}>
                <div className="displayNameWrapper">
                    <label htmlFor="display">Display Name</label>
                    <input id="display" type="text" onChange={(e) => onDisplayNameChange(e)} value={displayName} required/>
                </div>
                <div className="userNameWrapper">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" onChange={(e) => onEmailChange(e)} onBlur={isEmailValid} value={email} className={emailError ? "redBorderInput" : ""} required/>
                    <div className="emailError">{emailError}</div>
                </div>
                <div className="passwordWrapper">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" onChange={(e) => onPasswordChange(e)} value={password} required/>
                </div>
                <Button type="submit" variant="contained">Sign up</Button>
                {/* <div className="accountExists">Already have an account? <span onClick={() => navigate("/users/login")}>&nbsp;Login</span></div> */}
            </form>
      </div>
    );
}