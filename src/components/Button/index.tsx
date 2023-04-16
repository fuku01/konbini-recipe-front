import React from 'react'

// type ButtonProps = {
//   name: string
// }
type PostButtonProps = {
  children?: React.ReactNode
}

// export const Button = (props: ButtonProps) => {
//   return (
//     <button
//       className={
//         'py-2 px-4 bg-orange-500 text-white font-semibold rounded-lg  shadow-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75 w-28 mx-auto'
//       }
//     >
//       {props.name}
//     </button>
//   )
// }

export const PostButton = (props: PostButtonProps) => {
  return (
    <button
      className={
        'py-6 px-5 text-center text-xl rounded-full text-white bg-orange-500 hover:bg-orange-700 shadow-md '
      }
    >
      {props.children}
    </button>
  )
}
