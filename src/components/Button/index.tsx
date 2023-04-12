type ButtonProps = {
  name: string
}
type RedButtonProps = {
  name: string
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={
        'py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 w-28 mx-auto'
      }
    >
      {props.name}
    </button>
  )
}

export const RedButton = (props: RedButtonProps) => {
  return (
    <button
      className={
        'py-1 px-1 bg-red-500 text-white text-xs rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 w-10 mx-auto'
      }
    >
      {props.name}
    </button>
  )
}
