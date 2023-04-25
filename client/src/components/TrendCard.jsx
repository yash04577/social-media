import React from 'react'
import { TrendData } from '../TrendData'

const TrendCard = () => {
  return (
    <div className='bg-cardColor py-4 px-4 rounded-2xl flex flex-col gap-3'>
        <p className='font-bold text-xl'>Trend for You</p>

        {
            TrendData.map(trend=>{
                return(
                    <div>
                       <p className='font-bold'>#{trend.name}</p>
                       <p className='text-gray'>{trend.shares } shares</p>
                    </div>
                )
            })
        }
    </div>
  )
}

export default TrendCard