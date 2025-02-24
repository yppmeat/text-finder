import React, { useEffect, useState } from 'react';
import { FaClipboard } from 'react-icons/fa6';
import Copy from './Copy';

const Entry: React.FC<{ title: string; value: string }> = ({ title, value }) => {
  return (
    <div>
      <h2 className="text-xl select-none">{title}</h2>
      <div className="h-14 p-0.5 relative border border-gray-500 cursor-text">
        {value}
        <Copy fillColor='white' />
      </div>
    </div>
  );
};

export default Entry;
