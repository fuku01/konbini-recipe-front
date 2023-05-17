import React from 'react';
type SelectFormProps = {
  label?: React.ReactNode;
  placeholder?: string;
  width: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectForm = (props: SelectFormProps) => {
  const { label, placeholder, width } = props;
  return (
    <div className={`flex ${width} mx-auto mt-10`}>
      <div className="h-15 relative w-full">
        <select
          placeholder={placeholder}
          value={props.value} // ここにvalueプロパティを追加（編集ページの初期値表示のために必要。）
          className={`border-blue-gray-200 text-blue-gray-700 placeholder-shown:border-blue-gray-200 disabled:bg-blue-gray-50 peer h-full w-full rounded-none border-b bg-transparent pb-2 pt-10 text-base outline outline-0 transition-all focus:border-orange-500 focus:outline-0 disabled:border-0 ${
            props.value === '' ? 'text-gray-400' : 'text-blue-gray-700'
          }`}
          onChange={props.onChange}
        >
          <option value="">未選択</option>
          <option value="1">1</option>
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
        {label !== undefined && (
          <label className="after:content[' '] peer-disabled:peer-placeholder-shown:text-blue-gray-500 pointer-events-none absolute -top-2.5 left-0 flex h-full w-full select-none text-base font-semibold leading-tight transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-orange-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-focus:text-sm peer-focus:leading-tight peer-focus:text-orange-500 peer-focus:after:scale-x-100 peer-focus:after:border-orange-500 peer-disabled:text-transparent">
            {label}
          </label>
        )}
      </div>
    </div>
  );
};

export default SelectForm;
