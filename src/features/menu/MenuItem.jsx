import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../helper/helpers";
import Button from "../../ui/Button";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const currentQuantity = useSelector(getCurrentQuantityById(id));

  const isInCart = currentQuantity > 0;

  function createPizza() {
    dispatch(
      addItem({
        pizzaId: id,
        quantity: 1,
        unitPrice,
        totalPrice: unitPrice * 1,
        name,
      }),
    );
  }

  // const currentQuantity = useSelector(getCurrentQuantityById(id));

  return (
    <li className="flex gap-x-4 py-3">
      <img
        src={imageUrl}
        className={`h-28 ${soldOut ? "opacity-50 grayscale" : ""}`}
        alt={name}
      />
      <div className="flex grow flex-col">
        <p className="pb-1 font-medium">{name}</p>
        <p className="capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between text-sm">
          {!soldOut ? (
            <p className="font-semibold">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="font-semibold uppercase text-stone-500">Sold out</p>
          )}

          <div className="flex  gap-3">
            {!soldOut && isInCart && (
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
            )}

            {!soldOut && isInCart && <DeleteItem pizzaId={id} />}

            {!soldOut && !isInCart && (
              <Button onClick={createPizza} type="small">
                Add to Cart
              </Button>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
