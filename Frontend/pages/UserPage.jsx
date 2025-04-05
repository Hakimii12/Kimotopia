import UserHeader from '@/Components/UserHeader'
import UserPost from '@/Components/UserPost'
import React from 'react'
function UserPage() {

  return (
    <>
    <div >
    <UserHeader/>
    </div>
    <div className='ml-2 mt-6'>
      <UserPost/>
    </div>
      
    </>
     
  )
}

export default UserPage
