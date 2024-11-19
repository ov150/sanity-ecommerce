import { getActiveCoupon } from '@/sanity/lib/sales/getActiveCoupon'
import React from 'react'

const BlackFridayBanner = async () => {
    const sale  = await getActiveCoupon("BFRIDAY")
    if(!sale?.isActive){
        return null;
    }
    // sale.
  return (
    <div className='bg-gradient-to-r from-red-600 to-black text-white px-6 py-10 mx-4 mt-2 rounded-lg shadow-lg'>
        <div className='container mx-auth flex items-center justify-between'>
            <div className='flex-1'>
                <h2 className='text-3xl sm:text-5xl font-extrabold mb-6'>{sale.title}</h2>
                <p className="text-left text-xl sm:text-3xl font-semibold mb-6">{sale.description}</p>
            </div>
            <div className="flex">
                <div className='bg-white text-black py-4 px-6 rounded-full shadow-md transform hover:scale-105 transition duration-300'>
                    <span className='font-bold text-base sm:text-xl'>
                        Use Code: {" "}
                        <span className='text-red-600'>{sale.couponCode}</span> 
                    </span>
                    <span className='ml-2 font-bold text-baseee sm:text-xl'>
                        for {sale.discountAmount}% OFF
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BlackFridayBanner

// «diy className"ba-gradient-to-r @fron-red-600 @to-black text-white px-6 py-10 mx-4 mt-2 rounded-la shadow-1g"›
// ‹ony class anes" container nx-auto tlex irens-center fusty-between"?
// </dy>