import { Slider } from './Carousel'
import '../../Banner/banner.css'
import Banner from '../../Banner/Banner'
import { useSearchParams } from 'react-router-dom';
import { useSearchQuery } from '../../../redux/apis/productsApiSlice';
import { Spinner } from '@material-tailwind/react';
import { ProductCard } from '../../ProductCard/ProductCard';

const Home = () => {
  const [searchParam] = useSearchParams();
  const query = searchParam.get('q');

  const { data, isLoading: searching } = useSearchQuery(query, { skip: !query })

  if (searching) {
    return (
      <Spinner className="h-16 w-16 text-gray-900/50 mx-auto mt-5" />
    )
  }

  if (query) {
    if (data.length === 0) {
      return (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-3xl font-bold text-black">No Results Found</h1>
          
        </div>
      )
    } else {
      return (
        <div className="w-full bg-[aliceblue]  p-10">
        <h1 className="text-3xl font-bold text-black text-center mt-5">{data.length} Results Found </h1>
        
         
          <div className="flex flex-wrap justify-start mx-auto ">
            {
              data.map((product, index) => (
                
                  <ProductCard product={product} key={index} />
                
              ))
            }
          </div>

      
        </div>
      )

    }
  }

  const items = [{ src: 'https://cdn.pixabay.com/photo/2018/02/08/11/54/male-3139289_1280.jpg' }, { src: 'https://cdn.pixabay.com/photo/2022/03/06/03/18/friends-7050708_1280.jpg' }
    , { src: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1957&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
    , { src: 'https://images.unsplash.com/photo-1459204195697-4de88edf3ab1?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
  ]
  return (
    <div className='w-[95%] mx-auto mt-5'>
      <img src='https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-09082024-Fashionation-Last3daysofsale.gif' width={'100%'} />
      <div className='my-4'>
        <Slider items={items} />
      </div>
      <div className='mt-[100px] mb-[50px] flex flex-col gap-10'>
        <Banner image={'https://images.unsplash.com/photo-1535160303093-adc1c60c347d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
          text={'MEN CLOTHING'}
        />

        <Banner image={'https://images.unsplash.com/photo-1576082866986-460d8f2ae4fe?q=80&w=2040&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
          text={'WOMEN CLOTHING'}
        />

        <Banner image={'https://images.unsplash.com/photo-1707485122968-56916bd2c464?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
          text={'ELECTRONICS'}
        />

        <Banner image={'https://images.unsplash.com/photo-1450297166380-cabe503887e5?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
          text={'JWELERY'}
        />
      </div>
    </div>
  )
}

export default Home