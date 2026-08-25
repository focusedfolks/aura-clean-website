import { useCart } from "../context/CartContext";

export function CartToast() {
  const { toast, clearToast, setOpen } = useCart();

  if (!toast) return null;

  return (
    <div className="cart-toast" role="status" aria-live="polite">
      <div className="cart-toast-card">
        <span className="cart-toast-check" aria-hidden="true">
          ✓
        </span>
        <p>{toast}</p>
        <button
          type="button"
          className="cart-toast-view"
          onClick={() => {
            clearToast();
            setOpen(true);
          }}
        >
          View cart
        </button>
        <button type="button" className="cart-toast-close" onClick={clearToast} aria-label="Dismiss">
          ×
        </button>
      </div>
    </div>
  );
}
