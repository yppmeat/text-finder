import React, { useEffect, useState } from 'react';
import { FaGrip } from 'react-icons/fa6';

const Draggable: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className='px-2.5 cursor-all-scroll'>
        <FaGrip />
      </div>
    </div>
  );
};

export default Draggable;
