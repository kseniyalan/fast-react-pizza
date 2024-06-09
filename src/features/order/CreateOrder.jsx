import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { getCart, clearCart, getTotalCartPrice } from "../cart/cartSlice";
import { fetchAddressAction } from "../user/userSlice";
import store from "../../store";
import EmptyCart from "../cart/EmptyCart";
import { formatCurrency } from "../../utils/helpers";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) => /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(str);

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.userName);

  // Get the submittin state from navigation - when the form is submitting, the navigation state will be "submitting"
  const isSubmitting = navigation.state === "submitting";

  const cart = useSelector(getCart);
    const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0; // 20% of the total cart price
  const totalOrderPrice = totalCartPrice + priorityPrice;

  //Check for errors
  //This component is connected with the router and the action function
  //If we return an object with errors from the router action function, we can get them here

  const formErrors = useActionData();

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let's go!</h2>
      <button onClick={() => dispatch(fetchAddressAction())}>Get position</button>
      {/* The same things */}
      {/* Action will be declared right here in this component */}
      {/*<Form method="POST" action="/order/new">*/}
      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            className="input grow"
            defaultValue={userName}
            required
          />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input
              type="tel"
              name="phone"
              className="input w-full"
              required
            />
            {formErrors?.phone && 
              <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md">{formErrors.phone}</p>
            }
          </div>
          
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              className="input w-full"
              required
            />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="w-6 h-6 accent-yellow-400
            focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">Want to yo give your order priority?</label>
        </div>
        {/* Hidden input to provide cart data into the action function */}
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <div>
          <Button size="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Placing order...' : `Order now for ${formatCurrency(totalOrderPrice)}!`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const fornData = await request.formData();
  const data = Object.fromEntries(fornData);

  const order ={
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  //Validation
  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = "Please enter a valid phone number, we might need to call you!";
  }

  if (Object.keys(errors).length > 0) return errors;

  // If everything is ok, we can create the order and redirect to the order page
  const newOrder = await createOrder(order);

  //Clear the cart
  //We want to clear the cart after the order is created, but now we are not in the component. but in the action function
  //So we can not use the dispatch function here by using the useDispatch hook
  //We can use the store object to dispatch the action
  //IT IS A BAD PRACTICE TO USE THE STORE OBJECT DIRECTLY IN THE COMPONENTS
  //But it is ok to use it in the action functions
  //Do NOT overuse it
  store.dispatch(clearCart());

  //Lets redirect to the order page with the new order id
  //We can not use the navigate function here, because navigate() function is the hook and we are not in a component
  //We are in the action function, and navigate() is not available here
  //So we need to return the path
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
