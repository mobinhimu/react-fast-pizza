import { useSelector } from "react-redux";
import { formatCurrency } from "../../helper/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";
import { getCurrentQuantityById } from "./cartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <li className="items-center justify-between py-3 sm:flex">
      <p className="pb-2">
        <span className="font-semibold">{quantity}</span>&times; {name}
      </p>
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        <p className=" font-semibold">{formatCurrency(totalPrice)}</p>

        <UpdateItemQuantity
          pizzaId={pizzaId}
          currentQuantity={currentQuantity}
        />

        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
