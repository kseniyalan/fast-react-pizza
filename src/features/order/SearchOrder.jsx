import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!query || query.trim().length === 0) return;
        navigate(`/order/${query}`);
        setQuery('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                className='w-28 sm:w-64 rounded-full px-4 py-2 text-sm bg-yellow-100 placeholder:text-stone-400
                sm:focus:w-72 transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50'
                placeholder='Search order'
                value={query}
                onChange={(e) => setQuery(e.target.value)}  
            />
        </form>
    );
}

export default SearchOrder;