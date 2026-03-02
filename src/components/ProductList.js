import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom"; // Portal ke liye

export default function ProductList({ addedItems, onDelete }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            });
    }, []);

    // Logic: Add to cart (Point 6 logic extension)
    const addToCart = (product) => {
        const id = product.id || product.Name;
        const exist = cart.find((x) => x.id === id);
        if (exist) {
            setCart(cart.map((x) => x.id === id ? { ...exist, qty: exist.qty + 1 } : x));
        } else {
            setCart([...cart, { ...product, id, qty: 1 }]);
        }
    };

    // Logic: Minus/Remove from cart
    const removeFromCart = (product) => {
        const exist = cart.find((x) => x.id === product.id);
        if (exist.qty === 1) {
            setCart(cart.filter((x) => x.id !== product.id));
        } else {
            setCart(cart.map((x) => x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x));
        }
    };

    const totalPrice = cart.reduce((a, c) => a + c.qty * (c.price || c.Price), 0);
    const totalQty = cart.reduce((a, c) => a + c.qty, 0);

    const allProducts = [...addedItems, ...products];
    const filtered = allProducts.filter(p => 
        (p.title || p.Name).toLowerCase().includes(searchQuery.toLowerCase())
    );

    const CartUI = (
        <div className="card shadow border-0 h-100" style={{ position: 'sticky', top: '20px' }}>
            <div className="card-header bg-primary text-white fw-bold">🛒 Side Cart</div>
            <div className="card-body p-2" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                {cart.length === 0 && <p className="text-muted text-center small mt-3">Cart is empty</p>}
                {cart.map((item) => (
                    <div key={item.id} className="border-bottom pb-2 mb-2">
                        <p className="small mb-1 text-truncate fw-bold">{item.title || item.Name}</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <button onClick={() => removeFromCart(item)} className="btn btn-outline-danger btn-xs py-0 px-2">-</button>
                                <span className="mx-2 small">{item.qty}</span>
                                <button onClick={() => addToCart(item)} className="btn btn-outline-success btn-xs py-0 px-2">+</button>
                            </div>
                            <span className="small fw-bold text-success">₹{item.qty * (item.price || item.Price)}</span>
                        </div>
                    </div>
                ))}
            </div>
            {cart.length > 0 && (
                <div className="card-footer bg-light border-0">
                    <div className="d-flex justify-content-between mb-1 small">
                        <span>Items:</span> <span>{totalQty}</span>
                    </div>
                    <div className="d-flex justify-content-between fw-bold border-top pt-2">
                        <span>Total:</span> <span className="text-primary">₹{totalPrice.toFixed(2)}</span>
                    </div>
                    <button className="btn btn-primary w-100 btn-sm mt-3 shadow-sm" onClick={() => alert("Checkout Done!")}>Checkout</button>
                </div>
            )}
        </div>
    );

    if (loading) return <div className="text-center mt-5"><div className="spinner-border"></div></div>;

    return (
        <div className="row m-0">
            <div className="col-12 p-0">
                <input type="text" placeholder="🔍 Search Stock..." className="form-control mb-4 shadow-sm" 
                    onChange={(e) => setSearchQuery(e.target.value)} />

                <div className="d-flex flex-wrap gap-2">
                    {filtered.map((p, i) => (
                        <div className="card shadow-sm border-0" style={{ width: "12rem" }} key={i}>
                            <img src={p.image || "https://via.placeholder.com/150"} height="100" className="card-img-top p-2" style={{ objectFit: 'contain' }} alt="prod" />
                            <div className="card-body p-2">
                                <h6 className="text-truncate small mb-1">{p.title || p.Name}</h6>
                                <p className="fw-bold text-success small mb-2">₹{p.price || p.Price}</p>
                                <button onClick={() => addToCart(p)} className="btn btn-dark btn-sm w-100 mb-1" style={{ fontSize: '12px' }}>Add to Cart</button>
                                <button onClick={() => onDelete(i)} className="btn btn-link text-danger btn-sm w-100 p-0" style={{ fontSize: '10px', textDecoration: 'none' }}>Remove Stock</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* React Portal: Isse Cart sidebar wale div mein chala jayega */}
            {document.getElementById("side-cart-container") && 
                ReactDOM.createPortal(CartUI, document.getElementById("side-cart-container"))}
        </div>
    );
}