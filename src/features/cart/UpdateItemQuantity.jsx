import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { increaseItemQuantity, decreaseItemQuantity } from './cartSlice';

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
    const dispatch = useDispatch();

    return (
        // Your JSX code goes here
        <div className='flex gap-2 items-center md:gap-3'>
            <Button size="rounded" onClick={() => dispatch(decreaseItemQuantity(pizzaId))}>-</Button>
            <span className='text-sm font-medium'>{currentQuantity}</span>
            <Button size="rounded" onClick={() => dispatch(increaseItemQuantity(pizzaId))}>+</Button>
        </div>
    );
}

export default UpdateItemQuantity;