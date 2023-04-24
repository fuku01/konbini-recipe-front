import React from 'react'

type ButtonProps = {
  children?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const PostButton = (props: ButtonProps) => {
  return (
    <button
      className={
        'py-5 px-6 text-center text-xl rounded-full text-white bg-[#94C8AD] hover:bg-[#68B68D] shadow-md hover:syadow-lg'
      }
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export const EditButton = (props: ButtonProps) => {
  return (
    <button
      className={
        'py-3 px-4 text-center text-base rounded-full text-white bg-[#9FCDE5] hover:bg-[#61B3DF] shadow-md hover:syadow-lg'
      }
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export const DeleteButton = (props: ButtonProps) => {
  const Deletecheck = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (window.confirm('本当に削除しますか？')) {
      if (props.onClick) {
        props.onClick(e)
      }
    }
  }

  return (
    <button
      className={
        'py-3 px-4 text-center text-base rounded-full text-white bg-[#FEABAE] hover:bg-[#F16B6E] shadow-md hover:syadow-lg'
      }
      onClick={Deletecheck}
    >
      {props.children}
    </button>
  )
}
