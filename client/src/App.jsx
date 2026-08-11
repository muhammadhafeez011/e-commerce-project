import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Cart from "./Cart";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [userName, setUserName] = useState(localStorage.getItem("userName"));

  function addToCart(product) {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  }

  function removeFromCart(productId) {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  }

  function clearCart() {
    setCart([]);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setUserName(null);
  }

  return (
    <div className="App">
      <Header
        cartCount={cart.length}
        onCartClick={() => setIsCartOpen(!isCartOpen)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        userName={userName}
        onLogout={handleLogout}
      />
      <Cart cartItems={cart} isOpen={isCartOpen} onRemove={removeFromCart} />
      <Routes>
        <Route
          path="/"
          element={<Home searchTerm={searchTerm} onAddToCart={addToCart} />}
        />
        <Route
          path="/product/:id"
          element={<ProductDetails onAddToCart={addToCart} />}
        />
        <Route path="/login" element={<Login onLoginSuccess={setUserName} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/checkout"
          element={<Checkout cartItems={cart} clearCart={clearCart} />}
        />
      </Routes>
    </div>
  );
}

function Header({
  cartCount,
  onCartClick,
  searchTerm,
  onSearchChange,
  userName,
  onLogout,
}) {
  return (
    <header className="header">
      <h1>🛍️ Online Store</h1>
      <input
        type="search"
        placeholder="Search products..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {userName ? (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ color: "white" }}>Hi, {userName}</span>
          <button
            onClick={onLogout}
            style={{
              background: "none",
              border: "1px solid white",
              color: "white",
              padding: "4px 10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <Link to="/login" style={{ color: "white", marginRight: "15px" }}>
          Login
        </Link>
      )}
      <div
        className="cart-icon"
        onClick={onCartClick}
        style={{ cursor: "pointer" }}
      >
        🛒 {cartCount}
      </div>
    </header>
  );
}

export default App;
