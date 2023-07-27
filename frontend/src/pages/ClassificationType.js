import React, { useState } from 'react'
import Classification from './Classification'

const ClassificationType = () => {

    const [showStandard,setShowStandard] = useState(false);

  return (
    <div className='w-full h-auto'>
    {showStandard ?
    <Classification /> 
    : 
    <div className='relative py-5 px-10 flex flex-col items-center justify-center'>

      <h1 className='text-[26px] font-semibold mb-5'>Classification Type</h1>
     
        <div className='flex items-center justify-center w-[90%] py-5 gap-5'>
            
            <button onClick={()=>setShowStandard(true)} className='bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-600' type='button'>Standard</button>

            <button onClick={()=>alert("Oops! This feature is still under construction.")} className='bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-600' type='button'>Scientific</button>

        </div>
           
    </div>}
</div>
  )
}

export default ClassificationType