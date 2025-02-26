import React, { useEffect, useState } from 'react';
import Mousetrap from 'mousetrap';
import { INodeData } from '../models/interfaces';
import NodeFinder from '../models/NodeFinder';
import NodeSelector from '../models/OverlaySelector';

interface Props {
  shadowRoot: ShadowRoot;
  setCurrentOverlay: (value: INodeData | null) => void;
}

const Overlays: React.FC<Props> = ({ shadowRoot, setCurrentOverlay }) => {
  const [nodes, setNodes] = useState<INodeData[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [hoverGroupId, setHoverGroupId] = useState<number | null>(null);
  const [activeGroupId, setActiveGroupId] = useState<number | null>(null);

  useEffect(() => {
    Mousetrap.bind('alt+h', () => {
      setIsVisible(false);
      setTimeout(() => {
        const foundNodes = NodeFinder.getInstance().findNodes();
        setNodes(foundNodes);
        setIsVisible(true);
      }, 0);
      return false;
    });

    Mousetrap.bind('esc', () => {
      setIsVisible(false);
    });
  }, []);

  function containerMouseMoveHandler(event: React.MouseEvent): void {
    const overlay = NodeSelector.select(shadowRoot, event.clientX, event.clientY);
    if (!overlay) {
      setHoverGroupId(null);
    } else {
      const groupId = +overlay.dataset.groupId!;
      setHoverGroupId(groupId);
    }
  }

  function containerClickHandler(event: React.MouseEvent): void {
    const overlay = NodeSelector.select(shadowRoot, event.clientX, event.clientY);
    if (!overlay) {
      setActiveGroupId(null);
      setCurrentOverlay(null);
    } else {
      const groupId = +overlay.dataset.groupId!;
      setActiveGroupId(groupId);
      setCurrentOverlay(nodes[groupId]);
    }
  }

  return (
    <div
      className={`w-full h-full fixed bg-white/15 ${isVisible ? '' : 'hidden'}`}
      onMouseMove={containerMouseMoveHandler}
      onClick={containerClickHandler}
    >
      {nodes.map((node, index) => (
        <div key={`group-${index}`} data-group-id={index}>
          {node.sizes.map((size, innerIndex) => (
            <div
              key={`overlay-${index}-${innerIndex}`}
              data-overlay-id={innerIndex}
              className={`absolute cursor-pointer border ${
                activeGroupId === index || hoverGroupId === index
                  ? 'bg-white/25 border-white/50'
                  : 'bg-red-500/25 border-red-500/50'
              }`}
              style={{
                left: `${size.left}px`,
                top: `${size.top}px`,
                width: `${size.width}px`,
                height: `${size.height}px`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Overlays;
