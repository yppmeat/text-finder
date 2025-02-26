import React, { useEffect, useState } from 'react';
import Styles from './Styles';
import Overlays from './Overlays';
import Panel from './Panel';
import { INodeData } from '../models/interfaces';

interface Props {
  shadowRoot: ShadowRoot;
}

const App: React.FC<Props> = ({ shadowRoot }) => {
  const [currentOverlay, setCurrentOverlay] = useState<INodeData | null>(null);
  
  return (
    <>
      <Styles />
      <Overlays shadowRoot={shadowRoot} setCurrentOverlay={setCurrentOverlay} />
      <Panel currentOverlay={currentOverlay} />
    </>
  )
};

export default App;