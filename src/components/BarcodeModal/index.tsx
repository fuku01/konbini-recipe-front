// プラグインでスクロールを制御（サイドメニュー表示中の）
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// カメラ関係
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import React, { useEffect, useRef, useState } from 'react';
import { useScanner } from '@/hooks/scanner/useScanner';

// 他ページから受け取るステートの型を定義
type BarcodeModalProps = {
  isBarcodeModalOpen: boolean;
  setIsBarcodeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setBarcode: React.Dispatch<React.SetStateAction<string>>;
};

// Postページで定義した「isMenuOpenとsetIsMenuOpen」を受け取る。
const BarcodeModal = (props: BarcodeModalProps) => {
  const { isBarcodeModalOpen, setIsBarcodeModalOpen, setBarcode } = props;

  // カメラ関係
  const [code, setCode] = useState<string>();
  const { videoRef } = useScanner({ setCode });

  // サイドメニュー表示中に、背景をスクロールできなくする。
  const barcodeModal = useRef(null);
  const storedScrollY = useRef(0);
  useEffect(() => {
    if (isBarcodeModalOpen && barcodeModal.current) {
      storedScrollY.current = window.scrollY;
      disableBodyScroll(barcodeModal.current);
    }
    return () => {
      clearAllBodyScrollLocks(); // モーダルが閉じた時に行う処理
      window.scrollTo(0, storedScrollY.current); // モーダルが閉じた時にスクロール位置を戻す
    };
  }, [isBarcodeModalOpen]);

  // バーコードを読み取ったら、モーダルを閉じる
  useEffect(() => {
    if (code) {
      setBarcode(code);
      setIsBarcodeModalOpen(false);
    }
  }, [code, setBarcode, setIsBarcodeModalOpen]);

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
            className="fixed z-50 h-3/4 w-80 rounded-3xl bg-[#FCCFA5] shadow-xl lg:m-0 lg:h-96 lg:w-96"
            ref={barcodeModal}
          >
            <div className="flex justify-end">
              <FontAwesomeIcon
                icon={faXmark}
                className="mr-5 mt-4 cursor-pointer text-4xl transition duration-75 ease-in-out hover:scale-105 hover:text-orange-500"
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
                  className="mx-auto h-4/5 w-4/5 rounded-lg"
                />
                <textarea
                  value={code}
                  disabled
                  className="mx-auto mt-10 hidden rounded-lg border border-black"
                />
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
