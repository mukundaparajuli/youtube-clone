import React from 'react'
import SideBar from './SideBar'
import MainBody from './MainBody'
import Header from './Header'

const Body = () => {
  return (
    <div>
      <Header />
      <div className='relative flex'>
        <SideBar />
        <MainBody />
      </div>
    </div>
  );
}

export default Body 