// Test ID: IIDSAT
import { useEffect } from "react";
import { useFetcher, useLoaderData } from "react-router-dom";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";

import { getOrder} from "../../services/apiRestaurant";
import OrderItem from "./OrderItem";

import UpdateOrder from "./UpdateOrder";

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const order = useLoaderData();

  const fetcher = useFetcher();
  // Here we are going to load menu data to shom more info about pizzas which are in the order
  //We want to load that data on the page first load

  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') fetcher.load("/menu");
  }, [fetcher]);

  const {
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
    <div className="px-4 py-6 space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && 
            <span className="bg-red-500 rounded-full px-3 py-1 text-sm uppercase font-semibold text-red-50 tracking-wide">Priority</span>
          }
          <span className="bg-green-500 rounded-full px-3 py-1 text-sm uppercase font-semibold text-green-50 tracking-wide">{status} order</span>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2 bg-stone-200 px-6 py-5">
        <p className="text-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      {/* Pizzas list */}
      <ul className="divide-y divide-stone-200 border-t border-b">
        {cart.map((item) => 
          <OrderItem
            key={item.id}
            item={item}
            ingredients={fetcher?.data?.find(pizza => pizza.id === item.id)?.ingredients ?? []}
            isLoadingIngredients={fetcher?.state === 'loading'}
          />
        )}
      </ul>

      {/* Order summary */}
      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && 
          <p className="text-sm font-medium text-stone-600">Price priority: {formatCurrency(priorityPrice)}</p>
        }
        <p className="font-bold">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
      {!priority && (
        <UpdateOrder order={order} />
      )}
    </div>
  );
}

export async function loader({ params }) {
  const { orderId } = params;
  const order = getOrder(orderId);
  return order;
}

export default Order;
