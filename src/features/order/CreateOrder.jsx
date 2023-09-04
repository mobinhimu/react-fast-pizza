import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getPrizeOfPizza } from "../cart/cartSlice";
import { formatCurrency } from "../../helper/helpers";
import store from "../../store";
import { fetchAddress } from "../user/userSlice";
import Spinner from "../../ui/Spinner";

const isValidPhone = (str) => /^(?:(?:\+|00)88|01)?\d{11}\r?$/.test(str);

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const isValidPhone = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const error =
    isValidPhone &&
    isValidPhone
      .split(" ")
      .map((text, i) =>
        i === 0 ? (
          <strong key={crypto.randomUUID()}>{text} </strong>
        ) : (
          text + " "
        ),
      );

  const dispatch = useDispatch();

  const {
    username,
    address,
    error: positionError,
    status,
    position,
  } = useSelector((store) => store.user);

  const isLoading = status === "loading";

  const cart = useSelector(getCart);
  const pizzaPrice = useSelector(getPrizeOfPizza);

  const totalOfPizza = withPriority
    ? Math.round(pizzaPrice + pizzaPrice * (20 / 100))
    : pizzaPrice + 0;

  return (
    <div className="px-4">
      <h2 className="mb-12 mt-4 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      <Form method="POST">
        <div className="mb-4 items-center sm:flex">
          <label className="mb-3 block basis-48">First Name</label>
          <input
            type="text"
            name="customer"
            className="input w-full"
            defaultValue={username}
            required
          />
        </div>

        <div className="mb-4 items-center sm:flex">
          <label className="mb-3 block basis-48">Phone number</label>
          <div className="w-full">
            <input type="tel" className="input w-full" name="phone" required />
            {error && (
              <p className="mt-4 rounded-md bg-red-200 px-2 py-1 text-xs text-red-500">
                {error}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-4 items-center sm:flex">
          <label className="mb-3 block basis-48">Address</label>
          <div className="w-full">
            <input
              type="text"
              className="input w-full"
              name="address"
              required
              disabled={isLoading}
              defaultValue={address}
            />

            {positionError ? (
              <p className="mt-4 rounded-md bg-red-200 px-2 py-1 text-xs text-red-500">
                {positionError}
              </p>
            ) : (
              ""
            )}
          </div>
          <span className="absolute right-0 top-9 sm:top-0">
            {!address && (
              <Button
                type="small"
                onClick={(eve) => {
                  eve.preventDefault();
                  dispatch(fetchAddress());
                }}
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : "Get Location"}
              </Button>
            )}
          </span>
        </div>

        <div className="mb-4 flex items-center gap-4">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-4 w-4  accent-yellow-300"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-semibold">
            Want to yo give your order priority?
          </label>
        </div>

        <div className="my-10 items-center">
          <input type="hidden" value={JSON.stringify(cart)} name="cart" />
          <input
            type="hidden"
            value={address ? `${position.latitude}, ${position.longitude}` : ""}
            name="position"
          />
          <Button disabled={isSubmitting} type="small">
            {isSubmitting
              ? "Order Creating ... "
              : `Order now from ${formatCurrency(totalOfPizza)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const error = `${order.phone} is not valid , please give me your phone number to contact you`;

  if (!isValidPhone(order.phone)) return error;
  const orderCreate = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${orderCreate.id}`);
}

export default CreateOrder;
