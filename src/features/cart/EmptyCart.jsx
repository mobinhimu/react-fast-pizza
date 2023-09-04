import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <div className="p-3">
      <Link
        to="/menu"
        className=" mb-8 block text-blue-600 hover:border-blue-600 hover:underline"
      >
        &larr; Back to menu
      </Link>

      <p className="font-semibold">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
