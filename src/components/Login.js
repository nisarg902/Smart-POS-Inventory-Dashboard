import React, { useState } from "react";
import { useCookies } from "react-cookie";

export default function Login({ onSwitch }) {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [, setCookie] = useCookies(["username"]);

    const handleLogin = (e) => {
        e.preventDefault();
        const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

        if (storedUser) {
            if (storedUser.email === email && storedUser.password === pass) {
                alert("Login Successful!");
                setCookie("username", storedUser.name, { path: "/" });
            } else {
                alert("Incorrect password or email");
            }
        } else {
            alert("No user found! Please Register first.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <form onSubmit={handleLogin} className="card p-4 shadow" style={{ width: "350px" }}>
                <h3 className="text-center">Welcome Back</h3>
                <input type="email" placeholder="Email" className="form-control mb-2" 
                    onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" className="form-control mb-2" 
                    onChange={(e) => setPass(e.target.value)} required />
                <button type="submit" className="btn btn-dark w-100 mb-2">Login</button>
                <p className="small text-center">
                    Not registered? <span className="text-primary fw-bold" onClick={onSwitch} style={{ cursor: 'pointer' }}>Create Account</span>
                </p>
            </form>
        </div>
    );
}