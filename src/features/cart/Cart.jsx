import ButtonLink from "../../ui/ButtonLink";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  const dispatch = useDispatch();
  const username = useSelector((store) => store.user.username);
  const cart = useSelector(getCart);

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 pt-4">
      <ButtonLink to="/menu">&larr; Back to menu</ButtonLink>

      <h2 className="pt-8">Your cart, {username}</h2>

      <ul className="mt-3 divide-y divide-stone-300 border-b border-stone-300">
        {cart.map((item) => (
          <CartItem key={item.pizzaId} item={item} />
        ))}
      </ul>

      <div className="mt-6">
        <Button type="primary" to="/order/new">
          Order pizzas
        </Button>
        <Button type="clear" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
