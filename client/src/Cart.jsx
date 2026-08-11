import { Link } from "react-router-dom";

function Cart({ cartItems, isOpen, onRemove }) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (!isOpen) return null;

  return (
    <div className="cart-dropdown">
      <h3>Your Cart</h3>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <span>
                {item.name} x{item.quantity}
              </span>
              <span>${item.price * item.quantity}</span>
              <button className="remove-btn" onClick={() => onRemove(item._id)}>
                ✕
              </button>
            </div>
          ))}
          <hr />
          <div className="cart-total">
            <strong>Total: ${total}</strong>
          </div>
          <Link to="/checkout" style={{ textDecoration: "none" }}>
            <button style={{ width: "100%", marginTop: "10px" }}>
              Go to Checkout
            </button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;
