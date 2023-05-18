import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  const { placeholder, width, min, max } = props;

  return (
    <div className={`flex ${width} relative`}>
      {/* relativeを追加 */}
      <input
        placeholder={placeholder}
        value={props.value} // ここにvalueプロパティを追加（編集ページの初期値表示のために必要）
        type={props.type}
        min={props.type === 'number' ? min : undefined}
        max={props.type === 'number' ? max : undefined}
        className="peer h-full w-full rounded-lg bg-transparent py-1.5 pl-8 outline outline-1 outline-gray-300 transition-all duration-100 focus:outline-2 focus:outline-orange-500"
        onChange={props.onChange}
        maxLength={props.maxLength}
        required={props.required}
        disabled={props.disabled}
      />
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="absolute left-2 top-1/2 -translate-y-1/2 text-lg text-gray-400 transition-all duration-100 peer-focus:text-base peer-focus:text-orange-500"
      />
      {/* {label !== undefined && (
        <label className="pointer-events-none absolute -left-1 -top-6 flex h-full w-full select-none text-base font-semibold leading-tight transition-all  after:absolute peer-focus:text-sm peer-focus:text-orange-500 ">
          {label}
        </label>
      )} */}
    </div>
  );
};
export default TextForm;
