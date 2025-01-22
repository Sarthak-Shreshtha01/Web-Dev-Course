import React, { useContext } from 'react'
import { AppContext } from '../Context/Appcontext'

const Pagination = () => {
    const {Page,handlePageChange , TotalPage} = useContext(AppContext);
  return (
    <div className='w-full flex justify-center items-center border-2 py-1 fixed bottom-0 bg-white'>
        <div className='flex justify-between w-11/12 max-w-[670px]'>
            <div >
                {Page>1 && 
                    <button 
                    className='rounded-md border-2 px-4 py-0.5'
                    onClick={ ()=> handlePageChange(Page-1) }>Prev</button>
                }
            </div>

            <p className='font-bold text-sm text-center flex items-center justify-center'>
                Page {Page} of {TotalPage}
            </p>

            <div>
                {Page<TotalPage && 
                    <button 
                    className='rounded-md border-2 px-4 py-0.5'
                    onClick={()=>handlePageChange(Page+1)}>Next</button>
                }
            </div>
        </div>


    </div>
  )
}

export default Pagination