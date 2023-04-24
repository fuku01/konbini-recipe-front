import { faFilePen, faHeart, faHouse, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const Footer = () => {
  const router = useRouter()
  // faHouseの色を変える関数
  const GetHouseColor = () => {
    if (router.pathname === '/home') {
      return 'text-orange-400'
    } else {
      return 'text'
    }
  }

  // faFilePenの色を変える関数
  const GetFilePenColor = () => {
    if (router.pathname === '/post') {
      return 'text-orange-400'
    } else {
      return 'text-black'
    }
  }

  return (
    <div className='sticky bottom-0 z-50 h-20 bg-[#FCCFA5] flex justify-around items-center'>
      <Link href='/home'>
        <FontAwesomeIcon
          icon={faHouse}
          className={'text-4xl hover:text-orange-600 ' + GetHouseColor()}
        />
        <div className='text-sm'>{router.pathname === '/home' ? 'ホーム' : ''}</div>
      </Link>
      <FontAwesomeIcon icon={faMagnifyingGlass} className='text-4xl text-black' />
      <FontAwesomeIcon icon={faHeart} className='text-4xl text-black' />
      <Link href='/post'>
        <FontAwesomeIcon
          icon={faFilePen}
          className={'text-4xl hover:text-orange-600 ' + GetFilePenColor()}
        />
        <div className='text-sm'>{router.pathname === '/post' ? '投稿' : ''}</div>
      </Link>
    </div>
  )
}

export default Footer
