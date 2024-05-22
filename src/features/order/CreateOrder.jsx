import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) => /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(str);

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();

  // Get the submittin state from navigation - when the form is submitting, the navigation state will be "submitting"
  const isSubmitting = navigation.state === "submitting";
  const cart = fakeCart;

  //Check for errors
  //This component is connected with the router and the action function
  //If we return an object with errors from the router action function, we can get them here

  const formErrors = useActionData();

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      {/* The same things */}
      {/* Action will be declared right here in this component */}
      {/*<Form method="POST" action="/order/new">*/}
      <Form method="POST">
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="customer"
            className="input"
            required
          />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input
              type="tel"
              name="phone"
              className="input"
              required
            />
          </div>
          {formErrors?.phone && <p>{formErrors.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input
              type="text"
              name="address"
              className="input"
              required
            />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="w-6 h-6 accent-yellow-400
            focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>
        {/* Hidden input to provide cart data into the action function */}
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <div>
          <Button disabled={isSubmitting}>
            {isSubmitting ? 'Placing order...' : 'Order now!'}
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
    priority: data.priority === "on",
  };

  //Validation
  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = "Please enter a valid phone number, we might need to call you!";
  }

  if (Object.keys(errors).length > 0) return errors;

  // If everything is ok, we can create the order and redirect to the order page
  const newOrder = await createOrder(order);

  //Lets redirect to the order page with the new order id
  //We can not use the navigate function here, because navigate() function is the hook and we are not in a component
  //We are in the action function, and navigate() is not available here
  //So we need to return the path
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
