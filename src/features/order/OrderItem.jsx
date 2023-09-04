import { formatCurrency } from "../../helper/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-4">
      <div className="flex justify-between">
        <p>
          <span className="font-semibold">{quantity}&times;</span> {name}
        </p>
        <p className="font-semibold">{formatCurrency(totalPrice)}</p>
      </div>

      <p className="pt-2 text-xs italic text-stone-500">
        {isLoadingIngredients ? "Loading ......." : ingredients.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;
