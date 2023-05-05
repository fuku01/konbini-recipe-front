import { BrowserMultiFormatReader } from '@zxing/browser';
import { Result } from '@zxing/library';
import { useEffect, useMemo, useRef } from 'react';
import { useDebounce } from 'react-use';

type UseScannerProps = {
  setCode: React.Dispatch<React.SetStateAction<string | undefined>>;
};
// カメラの映像を取得し、バーコードを読み取る関数
export const useScanner = ({ setCode }: UseScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReader = useMemo(() => new BrowserMultiFormatReader(), []);

  const onReadCode = (result: Result) => {
    const updatedCode = result.getText();
    setCode(updatedCode);
  };

  useDebounce(
    async () => {
      if (!videoRef.current) return;
      const result = await codeReader.decodeOnceFromVideoDevice(
        undefined,
        videoRef.current
      );
      if (result) {
        onReadCode?.(result);
      }
    },
    50,
    [videoRef.current]
  );

  useEffect(() => {
    const videoRefCurrent = videoRef.current;
    return () => {
      if (videoRefCurrent) {
        const mediaStream = videoRefCurrent.srcObject as MediaStream;
        if (mediaStream) {
          mediaStream.getTracks().forEach((track) => {
            track.stop();
          });
        }
      }
    };
  }, []);

  return { videoRef };
};
