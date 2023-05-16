import React from 'react';

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};
export const PostButton = (props: ButtonProps) => {
  return (
    <button
      className="hover:syadow-lg disabled: rounded-full bg-[#94C8AD] px-5 py-4 text-center text-xl text-white shadow-md transition duration-75 ease-in-out hover:scale-105 hover:bg-[#68B68D] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:bg-gray-400"
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export const PostBlueButton = (props: ButtonProps) => {
  return (
    <button
      className="hover:syadow-lg rounded-full bg-[#9FCDE5] px-5 py-4 text-center text-xl text-white shadow-md hover:bg-[#61B3DF]"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export const DeleteButton = (props: ButtonProps) => {
  const Deletecheck = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (window.confirm('本当に削除しますか？')) {
      if (props.onClick) {
        props.onClick(e);
      }
    }
  };
  return (
    <button
      className="hover:syadow-lg rounded-full bg-[#FEABAE] px-4 py-3 text-center text-base text-white shadow-md transition duration-75 ease-in-out hover:scale-105 hover:bg-[#F16B6E]"
      onClick={Deletecheck}
    >
      {props.children}
    </button>
  );
};

export const BarcodeButton = (props: ButtonProps) => {
  return (
    <button
      className="hover:syadow-lg disabled: rounded-md bg-[#94C8AD] px-3 py-2 text-center text-xl text-white shadow-md transition duration-75 ease-in-out hover:scale-105 hover:bg-[#68B68D] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:bg-gray-400"
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export const TagButton = (props: ButtonProps) => {
  return (
    <button
      className="hover:syadow-lg rounded-full bg-orange-300 px-2 py-1 text-center text-base text-white shadow-md transition duration-75 ease-in-out hover:scale-105 hover:bg-orange-500 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:bg-gray-400"
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export const SearchButton = (props: ButtonProps) => {
  return (
    <button
      className="hover:syadow-lg rounded-full bg-orange-300 px-2 py-1 text-center text-base text-white shadow-md transition duration-75 ease-in-out hover:scale-105 hover:bg-orange-500 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:bg-gray-400"
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
