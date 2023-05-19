import React from 'react';

type TextFormProps = {
  label?: React.ReactNode;
  placeholder?: string;
  width: string;
  value?: string | number;
  type?: string;
  min?: number;
  max?: number;
  maxLength?: number;
  required?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextForm = (props: TextFormProps) => {
  const { label, placeholder, width, min, max } = props;

  return (
    <div className={`flex ${width} mx-auto mt-10`}>
      <div className="h-15 relative w-full">
        <input
          placeholder={placeholder}
          value={props.value} // ここにvalueプロパティを追加（編集ページの初期値表示のために必要）
          type={props.type}
          min={props.type === 'number' ? min : undefined}
          max={props.type === 'number' ? max : undefined}
          className="border-blue-gray-200 text-blue-gray-700 placeholder-shown:border-blue-gray-200 disabled:bg-blue-gray-50 peer h-full w-full rounded-none border-b bg-transparent pb-2 pt-10 text-base caret-orange-500 outline outline-0 transition-all focus:border-orange-500 focus:outline-0"
          onChange={props.onChange}
          maxLength={props.maxLength}
          required={props.required}
          disabled={props.disabled}
        />
        {label !== undefined && (
          <label className="after:content[' '] peer-disabled:peer-placeholder-shown:text-blue-gray-500 pointer-events-none absolute -top-2.5 left-0 flex h-full w-full select-none text-base font-semibold leading-tight transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-orange-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-focus:text-sm peer-focus:leading-tight peer-focus:text-orange-500 peer-focus:after:scale-x-100 peer-focus:after:border-orange-500">
            {label}
          </label>
        )}
      </div>
    </div>
  );
};

export default TextForm;
