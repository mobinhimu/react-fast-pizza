import { getQuantityOfPizza, getPrizeOfPizza } from "./cartSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CartOverview() {
  const quantityOfPizza = useSelector(getQuantityOfPizza);
  const prizeOfPizza = useSelector(getPrizeOfPizza);

  if (!quantityOfPizza || !quantityOfPizza) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 px-6  py-4 text-sm uppercase text-stone-300 sm:text-base">
      <p className="space-x-4 space-y-6 font-semibold">
        <span>{quantityOfPizza} pizzas</span>
        <span>${prizeOfPizza}</span>
      </p>
      <Link to="/cart" className="">
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
