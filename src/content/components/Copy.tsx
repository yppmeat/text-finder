import React, { useEffect, useState } from 'react';
import { FaClipboard } from 'react-icons/fa6';

const Copy: React.FC<{ fillColor?: string }> = ({ fillColor = 'black' }) => {
  return (
    <div className='flex items-center gap-1.5 absolute top-0 right-0 py-px px-1 bg-gray-500 text-sm cursor-pointer'>
      <FaClipboard fill={fillColor} /> Copy
    </div>
  )
};

export default Copy;
