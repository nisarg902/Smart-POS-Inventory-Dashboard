import React, { useState } from "react";

export default function Register({ onSwitch }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirm, setConfirm] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();
        if (name.charCodeAt(0) < 65 || name.charCodeAt(0) > 90) {
            alert("Name ka pehla letter Capital hona chahiye!");
            return;
        }
        if (!email.endsWith("@gmail.com")) {
            alert("Email sirf @gmail.com wali chalegi!");
            return;
        }
        if (pass !== confirm) {
            alert("Passwords match nahi ho rahe!");
            return;
        }
        const newUser = { name, email, password: pass };
        localStorage.setItem("registeredUser", JSON.stringify(newUser));
        alert("Registration Successful! Ab Login karein.");
        onSwitch();
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <form onSubmit={handleRegister} className="card p-4 shadow" style={{ width: "350px" }}>
                <h3 className="text-center">Create Account</h3>
                <input type="text" placeholder="Full Name (Capital Start)" className="form-control mb-2" 
                    onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email (@gmail.com)" className="form-control mb-2" 
                    onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" className="form-control mb-2" 
                    onChange={(e) => setPass(e.target.value)} required />
                <input type="password" placeholder="Confirm Password" className="form-control mb-2" 
                    onChange={(e) => setConfirm(e.target.value)} required />
                <button type="submit" className="btn btn-primary w-100 mb-2">Register</button>
                <p className="small text-center">Already have account? <span className="text-primary" onClick={onSwitch} style={{cursor:'pointer'}}> Login</span></p>
            </form>
        </div>
    );
}