import React, { useState } from "react";
import { useCookies } from "react-cookie";
import Login from "./components/Login";
import Register from "./components/Register";
import InventoryForm from "./components/InventoryForm";
import ProductList from "./components/ProductList";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    const [cookies, setCookie, removeCookie] = useCookies(["username"]);
    const [addedItems, setAddedItems] = useState([]);
    const [screen, setScreen] = useState("login");

    // Logic: Naya product list mein add karne ke liye
    const addNewProduct = (item) => {
        setAddedItems([item, ...addedItems]);
    };

    // Logic: Product delete karne ke liye
    const deleteProduct = (id) => {
        const updatedList = addedItems.filter((_, index) => index !== id);
        setAddedItems(updatedList);
    };

    // Agar user login nahi hai
    if (!cookies.username) {
        if (screen === "login") {
            return <Login onSwitch={() => setScreen("register")} />;
        } else {
            return <Register onSwitch={() => setScreen("login")} />;
        }
    }

    return (
        <div className="bg-light min-vh-100">
            <nav className="navbar navbar-dark bg-dark px-4 shadow">
                <span className="navbar-brand fw-bold">Professional Smart Shop</span>
                <div className="d-flex align-items-center">
                    <span className="text-white me-3">Welcome, {cookies.username}</span>
                    <button className="btn btn-danger btn-sm" onClick={() => removeCookie("username", { path: "/" })}>Logout</button>
                </div>
            </nav>

            {/* Main Layout Section */}
            <div className="container-fluid py-4">
                <div className="row g-3">
                    {/* Left: Inventory Form (Col-2) */}
                    <div className="col-md-2">
                        <InventoryForm onAdd={addNewProduct} />
                    </div>

                    {/* Middle: Product Cards (Col-7) */}
                    <div className="col-md-7">
                        <ProductList addedItems={addedItems} onDelete={deleteProduct} />
                    </div>

                    {/* Right: Side Cart (Col-3) - Naya Feature */}
                    <div id="side-cart-container" className="col-md-3">
                        {/* Cart yahan dikhega, hum ise ProductList se control karenge */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;