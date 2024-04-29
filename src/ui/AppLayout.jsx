import { Outlet, useNavigation } from 'react-router-dom';

import Header from './Header';
import CartOverview from '../features/cart/CartOverview';

import Spinner from './Spinner';

function AppLayout() {
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";

    return (
        <div className='layout'>
            {isLoading && <Spinner />}

            {/* These components will be also rendered */}
           <Header />
           <main>
               <Outlet />
            </main>
            <CartOverview />
        </div>
    );
}

export default AppLayout;