import React from 'react'
import { Link } from 'react-router-dom'

const Banner = ({ image, text }) => {
    return (
        <div className=' shadow-lg rounded-xl w-full h-[400px] mx-auto  transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl'>
            <Link to={'/men'}>
                <img src={image} className='w-full h-full rounded-xl object-fit' />
                <div className='w-full  relative bottom-[270px]'>
                    <h1 className='  banner-text text-center mt-4 text-white '>{text}</h1>
                </div>
            </Link>
        </div>
    )
}

export default Banner