import React, { useState } from "react"
import axios from 'axios';
import {server,google_link} from './config';

const Auth = () => {
    const [isLogin, setIsLogin] = useState('true');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const authenticationHandler = () => {
        setLoading(true);
        axios.post(`${server}/auth/${isLogin?"signin":"signup"}/`,{user:userName,password,service:"app"})
        .then(res => {
            localStorage.setItem("token",res.data.token);
            setLoading(false)
            window.location.reload();
        })
        .catch(err => {
            console.log(err.response);
            setLoading(false);
            setError(err.response.data)
        })

    }
    return <div className="Auth">
        <div className="Auth__heading">{isLogin?"LOGIN FORM":"SIGNUP FORM"}</div>
        <div>
            <div className="Auth__fields">
                <span>UserName</span>
                <input value={userName} type="text" onChange={(e) => setUserName(e.target.value)} />
            </div>
            <div className="Auth__fields"v>
                <span>Password</span>
                <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="Auth__loginbutton" onClick={authenticationHandler}>{isLogin?"Login":"Signup"}</div>
        </div>
        <a href={google_link}><div className="Auth__googlebutton">Use Google Auth</div></a>
        <div className="Auth__changemethod" onClick={() => setIsLogin(!isLogin)}>{isLogin?"New user? Please SignUp":"Already registered SignIn"}</div>
        {loading?<div className="loading">Loading ...</div>:null}
        {error?<div className="Auth__error">{error}</div>:null}
    </div>
}

export default Auth