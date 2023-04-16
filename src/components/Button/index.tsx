import React from 'react'

type PostButtonProps = {
  children?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const PostButton = (props: PostButtonProps) => {
  return (
    <button
      className={
        'py-6 px-5 text-center text-xl rounded-full text-white bg-orange-500 hover:bg-orange-700 shadow-md '
      }
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}
