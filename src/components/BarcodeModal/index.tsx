// プラグインでスクロールを制御（サイドメニュー表示中の）
import { faBarcode, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// カメラ関係
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import React, { useEffect, useRef, useState } from 'react';
// カメラ関係
import { BarcodeButton } from '../Button';
import { useScanner } from '@/hooks/scanner/useScanner';

// SideMenuPropsを定義

// isMenuOpenはboolean型、setIsMenuOpenはReact.Dispatch<React.SetStateAction<boolean>>型である。
type BarcodeModalProps = {
  isBarcodeModalOpen: boolean;
  setIsBarcodeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setBarcode: React.Dispatch<React.SetStateAction<string>>;
  setBarcodeName: React.Dispatch<React.SetStateAction<string>>;
};

// Header.tsxで定義した「isMenuOpenとsetIsMenuOpen」を受け取る。
const BarcodeModal = (props: BarcodeModalProps) => {
  const {
    isBarcodeModalOpen,
    setIsBarcodeModalOpen,
    setBarcode,
    setBarcodeName,
  } = props;

  // カメラ関係
  const [code, setCode] = useState<string>();
  const [name, setName] = useState<string>();

  const { videoRef } = useScanner({ setCode });

  // サイドメニュー表示中に、背景をスクロールできなくする。
  const barcodeModal = useRef(null);
  const storedScrollY = useRef(0);
  useEffect(() => {
    if (isBarcodeModalOpen && barcodeModal.current) {
      storedScrollY.current = window.scrollY;
      disableBodyScroll(barcodeModal.current);
    }
    // モーダルが閉じた時に行う処理
    return () => {
      clearAllBodyScrollLocks();
      window.scrollTo(0, storedScrollY.current);
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
            className="fixed z-50 h-3/4 w-80 bg-[#FCCFA5] text-black shadow-xl lg:mt-0"
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
            <div>
              <div className="mt-10 flex flex-col justify-center">
                <video
                  ref={videoRef}
                  className="mx-auto w-52 rounded-lg shadow-sm"
                />
                <textarea
                  value={code}
                  disabled
                  className="mx-auto mt-10 rounded-lg border border-black"
                />
                <input
                  className="mx-auto mt-2 rounded-lg border border-black"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <div className="mt-2 text-center">
                  <BarcodeButton
                    onClick={() => {
                      if (code) {
                        setBarcode(code);
                      }
                      if (name) {
                        setBarcodeName(name);
                      }
                      setIsBarcodeModalOpen(false);
                    }}
                  >
                    <FontAwesomeIcon icon={faBarcode} />
                  </BarcodeButton>
                </div>
              </div>
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
