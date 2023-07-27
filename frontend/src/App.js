import React,{useState} from 'react';
import Home from './pages/Home';
import ClassificationType from './pages/ClassificationType';

function App() {

  const [isDbId,setIsDbId] = useState(true);
  const [showHome,setShowHome] = useState(false);
  const [showClassification,setShowClassification] = useState(false);
  

  return (
    <>
    <div className='bg-purple-300 w-full h-auto'>
      {showHome && <button className='bg-purple-700 cursor-pointer text-white font-semibold py-2 px-2 rounded-r hover:bg-purple-600' type='button' onClick={()=>{setShowHome(false);setIsDbId(true)}}>Back</button>}

      {showClassification && <button className='bg-purple-700 cursor-pointer text-white font-semibold py-2 px-2 rounded-r hover:bg-purple-600' type='button' onClick={()=>{setShowClassification(false);setIsDbId(true)}}>Back</button>}



      {isDbId && <div className='flex flex-col items-center justify-center py-5'>
      <h1 className='text-[24px] font-semibold'>Already have DB-Inserted-Id?</h1>
        <div className='flex items-center justify-center gap-20 w-[90%] py-10'>
          <button className='bg-purple-700 cursor-pointer text-white font-semibold py-2 px-8 rounded hover:bg-purple-600' type='button' onClick={()=>{setShowHome(true); setIsDbId(false); setShowClassification(false)}} >No</button>
          <button className='bg-purple-700 cursor-pointer text-white font-semibold py-2 px-8 rounded hover:bg-purple-600' type='button' onClick={()=>{setShowHome(false); setIsDbId(false); setShowClassification(true)}} >Yes</button>
        </div>
      </div>}
      {showHome && <Home />}
      {showClassification && <ClassificationType />}
      </div>
      
      </>
  );
}

export default App;
