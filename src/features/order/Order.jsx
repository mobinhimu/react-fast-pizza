// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../helper/helpers";
import OrderItem from "./OrderItem";
import { getOrder } from "../../services/apiRestaurant";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.state === "idle" && !fetcher.data) fetcher.load("/menu");
  }, [fetcher]);

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff

  const {
    customer,
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="flex flex-col  gap-10 px-4 py-6">
      <div className="flex flex-wrap justify-between gap-2">
        <h2 className="text-xl font-bold">
          Order #{id} Status - {customer}
        </h2>

        <div>
          {priority && (
            <span className="mr-5 rounded-full bg-red-500 px-4 py-1 font-semibold uppercase text-stone-200">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-600 px-4 py-1 font-semibold uppercase text-stone-200">
            {status} Preparing Order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-300 p-4">
        <p className="text-base font-semibold">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-600">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="flex flex-col divide-y divide-stone-300">
        {cart.map((item) => {
          return (
            <OrderItem
              item={item}
              key={crypto.randomUUID()}
              isLoadingIngredients={fetcher.state === "loading"}
              ingredients={
                fetcher.data?.find((ele) => ele.id === item.pizzaId)
                  .ingredients ?? []
              }
            />
          );
        })}
      </ul>

      <div className="flex  flex-col gap-2 bg-stone-300 p-4">
        <p className="text-sm">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && (
          <p className="text-sm">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-semibold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      <div className="ml-auto">{!priority && <UpdateOrder />}</div>
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderID);
  return order;
}

export default Order;
