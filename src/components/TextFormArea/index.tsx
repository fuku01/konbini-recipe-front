import React from 'react'

type TextFormProps = {
  label?: string
  placeholder?: string
  witdh: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const TextFormArea = (props: TextFormProps) => {
  const { label, placeholder, witdh } = props

  return (
    <div className={`flex ${witdh} flex-col items-end mt-10`}>
      <div className='relative w-full min-w-[100px]'>
        <textarea
          placeholder={placeholder}
          className='peer h-full min-h-[200px] mt-5 w-full resize-none border-b border-blue-gray-200 bg-transparent pt-6 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-orange-500 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50 rounded-none'
          onChange={props.onChange}
        ></textarea>

        {label && (
          <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-md font-normal leading-tight text-black transition-all after:absolute after:-bottom-1 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-orange-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-black peer-focus:text-sm peer-focus:leading-tight peer-focus:text-orange-500 peer-focus:after:scale-x-100 peer-focus:after:border-orange-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            {label}
          </label>
        )}
      </div>
    </div>
  )
}

export default TextFormArea
