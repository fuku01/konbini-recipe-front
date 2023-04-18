import { faFilePen, faHeart, faHouse, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='sticky bottom-0 z-50 h-20 bg-[#FCCFA5] text-white flex justify-center items-center space-x-12'>
      <Link href='/home'>
        <FontAwesomeIcon icon={faHouse} className='text-3xl text-black' />
      </Link>
      <FontAwesomeIcon icon={faMagnifyingGlass} className='text-3xl text-black' />
      <FontAwesomeIcon icon={faHeart} className='text-3xl text-black' />
      <Link href='/post'>
        <FontAwesomeIcon icon={faFilePen} className='text-3xl text-black' />
      </Link>
    </div>
  )
}

export default Footer
