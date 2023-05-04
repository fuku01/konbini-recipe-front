// プラグインでスクロールを制御（サイドメニュー表示中の）
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Result } from '@zxing/library';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import React, { useEffect, useRef, useState } from 'react';
// import { useScanner } from '@/hooks/scanner/useScanner';

// SideMenuPropsを定義

// isMenuOpenはboolean型、setIsMenuOpenはReact.Dispatch<React.SetStateAction<boolean>>型である。
type BarcodeModalProps = {
  isBarcodeModalOpen: boolean;
  setIsBarcodeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// Header.tsxで定義した「isMenuOpenとsetIsMenuOpen」を受け取る。
const BarcodeModal = (props: BarcodeModalProps) => {
  const { isBarcodeModalOpen, setIsBarcodeModalOpen } = props;
  // const [code, setCode] = useState<string>();
  // const onReadCode = (result: Result) => {
  //   const updatedCode = result.getText();
  //   setCode(updatedCode);
  // };
  // const { videoRef } = useScanner({ onReadCode });

  // サイドメニュー表示中に、背景をスクロールできなくする。//
  const barcodeModal = useRef(null);
  useEffect(() => {
    if (isBarcodeModalOpen && barcodeModal.current) {
      disableBodyScroll(barcodeModal.current);
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [isBarcodeModalOpen]);
  ///////////////////////////////////////////////////

  // サイドメニューを表示中は背景にオーバーレイを表示する;
  const overlay = () => {
    return (
      <div
        className="fixed inset-0 z-40 mx-auto flex items-center justify-center bg-black opacity-50 lg:w-1/3"
        onClick={() => {
          setIsBarcodeModalOpen(false);
        }}
      ></div>
    );
  };

  if (isBarcodeModalOpen) {
    return (
      <>
        {overlay()}
        <div className="flex justify-center">
          <div
            className="fixed z-50 mt-2 h-3/4 w-5/6 bg-[#FCCFA5] text-black shadow-xl lg:mt-0 lg:w-1/4"
            ref={barcodeModal}
          >
            <div className="flex justify-end">
              <FontAwesomeIcon
                icon={faXmark}
                className="mr-6 mt-2 cursor-pointer text-4xl hover:text-orange-500"
                onClick={() => {
                  setIsBarcodeModalOpen(false);
                }}
              />
            </div>
            {/* 以下にモーダル項目を追加する */}
            <div
              className="text-lg"
              onClick={() => {
                setIsBarcodeModalOpen(false);
              }}
            >
              {/* <div className="mt-10 flex flex-col justify-center">
            <video
              ref={videoRef}
              className="mx-auto w-52 rounded-lg shadow-sm"
            />
            <textarea
              value={code}
              disabled
              className="mx-auto mt-10 rounded-lg border border-black"
            />
          </div> */}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default BarcodeModal;
