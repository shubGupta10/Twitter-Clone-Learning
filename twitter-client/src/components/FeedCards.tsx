import React from 'react'
import Image from 'next/image'
import { BiMessage, BiUpload } from 'react-icons/bi'
import { FaRetweet } from 'react-icons/fa'
import { AiOutlineHeart } from 'react-icons/ai'

const FeedCards: React.FC = () => {
  return (
    <div className='border border-r-0 border-l-0 border-b-0 border-gray-600 p-4 hover:bg-slate-900 transition-all gap-3 cursor-pointer'>
    <div className='grid grid-cols-12'>
        <div className='col-span-4'>
            <Image src="https://avatars.githubusercontent.com/u/132940559?v=4" alt='User Image' height={50} width={50} />
        </div>
        <div className=' col-span-11'>
            <h5>Shubham Gupta</h5>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p>
            <div className='flex justify-between mt-5 text-xl items-center p-2 w-[90%] '>
                <div>
                <BiMessage/>
                </div>
                <div>
                <FaRetweet/>
                </div>
                <div>
                <AiOutlineHeart/>
                </div>
                <div>
                <BiUpload/>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default FeedCards