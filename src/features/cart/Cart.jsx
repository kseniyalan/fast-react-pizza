import { useSelector, useDispatch } from 'react-redux';

import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import { clearCart, getCart } from './cartSlice';

function Cart() {
  const userName = useSelector((state) => state.user.userName);

  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className='px-4 py-3'>
      <LinkButton to="/menu">
        &larr; Back to menu
      </LinkButton>

      <h2 className='mt-7 text-xl font-semibold'>Your cart, {userName}</h2>
      <ul className='divide-y divide-stone-200 border-b mt-4'>
        {cart.map((item) => (
          <CartItem key={item.pizzaId} item={item} />
        ))}
      </ul>

      <div className='mt-6 space-x-2'>
        <Button size="primary" to="/order/new">Order pizzas</Button>
        <Button
          size="secondary"
          onClick={() => dispatch(clearCart())}
        >
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
