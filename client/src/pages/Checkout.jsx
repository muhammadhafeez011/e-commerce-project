import { useNavigate } from "react-router-dom";

function Checkout({ cartItems, clearCart }) {
  const navigate = useNavigate();
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  async function handlePlaceOrder() {
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      alert("Please login first to place an order.");
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      const res = await fetch(
        "https://e-commerce-project-ten-ecru.vercel.app/api/orders",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userEmail,
            items: cartItems.map((item) => ({
              name: item.name,
              price: item.price,
              quantity: item.quantity,
            })),
            total,
          }),
        },
      );

      if (!res.ok) {
        alert("Failed to place order. Try again.");
        return;
      }

      alert("Order placed successfully!");
      clearCart();
      navigate("/");
    } catch (err) {
      alert("Something went wrong. Try again.");
    }
  }

  return (
    <div className="auth-container" style={{ maxWidth: "500px" }}>
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <span>
                {item.name} x{item.quantity}
              </span>
              <span>${item.price * item.quantity}</span>
            </div>
          ))}
          <h3 style={{ textAlign: "right", marginTop: "15px" }}>
            Total: ${total}
          </h3>
          <button onClick={handlePlaceOrder}>Place Order</button>
        </>
      )}
    </div>
  );
}

export default Checkout;
