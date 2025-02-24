import React, { useEffect, useState } from 'react';
import Entry from './Entry';

const Panel: React.FC = () => {
  return (
    <div className='size-96 right-2.5 p-2.5 space-y-2.5 fixed bottom-2.5 bg-black/90 rounded-xl border border-white/50'>
      <Entry title="title" value="title"/>
      <Entry title="placeholder" value="placeholder"/>
      <Entry title="textContent" value="textContent"/>
    </div>
  )
};

export default Panel;
