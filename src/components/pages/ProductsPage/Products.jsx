import { Spinner } from '@material-tailwind/react';
import { useGetProductsByCategoryQuery } from '../../../redux/apis/productsApiSlice';
import { Link, useLocation } from 'react-router-dom';
import { ProductCard } from '../../ProductCard/ProductCard';

const Products = () => {
    const location = useLocation();
    const path = location.pathname;
    let category = path.split('/')[1];
   
    if (category !== 'electronics' && category !== 'jewelery') {
        category = path === '/men' ? "men's clothing" : "women's clothing";
    }
    const {data, isLoading, error, isFetching} = useGetProductsByCategoryQuery(category);

    if (isLoading || isFetching) {
        return (
          <Spinner className="h-16 w-16 text-gray-900/50 mx-auto mt-5"/>
        )
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="w-full bg-[aliceblue]  p-10">
            <div className="flex flex-wrap justify-start ">
                {
                    data?.map((product, index) => (
                       
                            <ProductCard 
                                product={product} 
                                key={index}
                            />
                        
                    ))
                }
            </div>
        </div>
    )
}

export default Products;
