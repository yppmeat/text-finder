import React, { useEffect, useState } from 'react';
import Draggable from './Draggable';
import Entry from './Entry';
import { INodeData } from '../models/interfaces';
import XPathGenerator from '../models/XpathGenerator';

interface Props {
  currentOverlay: INodeData | null;
}

const Panel: React.FC<Props> = ({ currentOverlay }) => {
  return (
    <div className="w-96 right-2.5 p-5 space-y-2.5 fixed bottom-2.5 bg-black/90 rounded-xl border border-gray-500/50">
      <Draggable />
      <Entry
        title="XPath"
        value={currentOverlay ? XPathGenerator.getInstance().generate(currentOverlay.target) : ''}
      />
      <Entry title="[title]" value={currentOverlay?.title ?? ''} />
      <Entry title="[placeholder]" value={currentOverlay?.placeholder ?? ''} />
      <Entry title="textContent" value={currentOverlay?.textContent ?? ''} />
    </div>
  );
};

export default Panel;
