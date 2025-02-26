import React, { useEffect, useState } from 'react';
import { FaClipboard } from 'react-icons/fa6';

interface Props {
  fillColor?: string;
  value: string;
}

const Copy: React.FC<Props> = ({ fillColor = 'black', value }) => {
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [message, setMessage] = useState('Copy');

  function clickHandler() {
    navigator.clipboard.writeText(value);
    setMessage('Copied!');

    if (intervalId) {
      window.clearTimeout(intervalId);
    }

    const id = window.setTimeout(() => {
      setMessage('Copy');
    }, 2000);
    setIntervalId(id);
  }

  return (
    <div className='relative h-0 z-[1]'>
      <div
        className="flex items-center gap-1.5 absolute right-0 py-px px-1 bg-gray-500 text-sm select-none cursor-pointer"
        onClick={clickHandler}
      >
        <FaClipboard fill={fillColor} /> {message}
      </div>
    </div>
  );
};

export default Copy;
