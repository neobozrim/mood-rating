import React, { useEffect } from 'react';

declare const QRCode: any;

interface Props {
  value: string;
}

export const QRCodeGenerator: React.FC<Props> = ({ value }) => {
  const qrRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (qrRef.current) {
      qrRef.current.innerHTML = '';
      new QRCode(qrRef.current, {
        text: value,
        width: 200,
        height: 200,
      });
    }
    return () => {
      if (qrRef.current) {
        qrRef.current.innerHTML = '';
      }
    };
  }, [value]);

  return <div ref={qrRef} className="bg-white p-4 inline-block rounded" />;
};