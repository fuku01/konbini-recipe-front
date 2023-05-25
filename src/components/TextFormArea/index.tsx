import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type TextFormProps = {
  label?: string;
  labelIcon?: IconDefinition;
  placeholder?: string;
  width: string;
  value?: string | number;
  maxLength?: number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextFormArea = (props: TextFormProps) => {
  const { label, labelIcon, placeholder, width } = props;

  return (
    <div className={`flex ${width} mt-10 flex-col items-end`}>
      <div className="relative w-full min-w-[100px]">
        <textarea
          placeholder={placeholder}
          value={props.value} // ここにvalueプロパティを追加（編集ページの初期値表示のために必要）
          className="border-blue-gray-200 text-blue-gray-700 placeholder-shown:border-blue-gray-200 disabled:bg-blue-gray-50 peer mt-5 h-full min-h-[200px] w-full resize-none rounded-none border-b bg-transparent pb-1.5 pt-6 text-base caret-orange-500 outline outline-0 transition-all focus:border-orange-500 focus:outline-0 disabled:resize-none"
          onChange={props.onChange}
          maxLength={props.maxLength}
        ></textarea>

        {label && (
          <label className="after:content[' '] peer-disabled:peer-placeholder-shown:text-blue-gray-500 pointer-events-none absolute -top-2.5 left-0 flex h-full w-full select-none text-base font-semibold leading-tight transition-all after:absolute after:-bottom-1 after:block after:w-full after:scale-x-0 after:border-b after:border-orange-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-focus:text-sm peer-focus:leading-tight peer-focus:text-orange-500 peer-focus:after:scale-x-100 peer-focus:after:border-orange-500 peer-disabled:text-transparent">
            <div>
              {labelIcon && (
                <FontAwesomeIcon icon={labelIcon} className="mr-1 w-5" />
              )}
              {label}
            </div>
          </label>
        )}
      </div>
    </div>
  );
};

export default TextFormArea;
