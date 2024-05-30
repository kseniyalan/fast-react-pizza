import { useSelector } from 'react-redux';  
import CreateUser from '../features/user/CreateUser';
import Button from './Button';

function Home() {
  const userName = useSelector((state) => state.user.userName);

  return (
    <div className='text-center my-10 sm:my-16 px-4 '>
      <h1 className="text-xl md:text-3xl font-semibold mb-4">
        The best pizza.
        <br />
        <span className="text-yellow-500">Straight out of the oven, straight to you.</span>
      </h1>
      {userName === '' ? (
        <CreateUser />
      ) : (
        <Button size="primary" to="/menu">Continue ordering, {userName}</Button>
      )}
      
    </div>
  );
}

export default Home;
