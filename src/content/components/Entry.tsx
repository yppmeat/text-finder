import React, { useEffect, useState } from 'react';
import Copy from './Copy';

interface Props {
  title: string;
  value: string;
}

const Entry: React.FC<Props> = ({ title, value }) => {
  return (
    <div>
      <h2 className="text-xl select-none">{title}</h2>
      <Copy fillColor="white" value={value} />
      <div className="h-14 p-0.5 pr-18 relative border border-gray-500 cursor-text whitespace-nowrap overflow-x-auto">
        {value}
      </div>
    </div>
  );
};

export default Entry;
