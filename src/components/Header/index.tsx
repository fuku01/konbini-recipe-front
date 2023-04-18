import { faBars, faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='sticky top-0 z-50 h-20 bg-[#FCCFA5] text-white flex justify-center items-center'>
      <div className='relative w-full'>
        <Link href='/signup'>
          <FontAwesomeIcon icon={faBars} className='text-3xl text-black absolute left-6' />
        </Link>
        <div className='text-2xl font-bold text-black text-center'>コンビニレシピ</div>
      </div>
    </div>
  )
}

export default Header
