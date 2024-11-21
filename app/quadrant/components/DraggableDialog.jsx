import React, { useRef, useState } from 'react';
import { DraggableCore } from 'react-draggable';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

export const DraggableDialog = ({ title, children, onClose }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef(null);
  const startPoint = useRef({ x: 0, y: 0 });
  const lastOffset = useRef({ x: 0, y: 0 });

  const handleDragStart = e => {
    startPoint.current = {
      x: e.clientX - lastOffset.current.x,
      y: e.clientY - lastOffset.current.y,
    };
  };

  const handleDrag = (e, data) => {
    const newX = e.clientX - startPoint.current.x;
    const newY = e.clientY - startPoint.current.y;

    lastOffset.current = { x: newX, y: newY };

    setOffset({
      x: newX,
      y: newY,
    });
  };

  return (
    <Dialog.Content
      className="fixed bg-white rounded-lg shadow-lg z-50"
      style={{
        transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px)`,
        top: '50%',
        left: '50%',
      }}
      aria-describedby="dialog-description"
    >
      <DraggableCore
        onDrag={handleDrag}
        onStart={handleDragStart}
        nodeRef={dragRef}
      >
        <div
          ref={dragRef}
          className="px-6 py-3 bg-gray-50 cursor-move border-b flex items-center justify-between select-none rounded-t-lg"
        >
          <Dialog.Title className="text-base font-semibold text-gray-800">
            {title}
          </Dialog.Title>
          <Dialog.Close asChild>
            <button
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close"
              onClick={onClose}
            >
              <X size={16} />
            </button>
          </Dialog.Close>
        </div>
      </DraggableCore>
      <div className="p-6">
        <div id="dialog-description" className="sr-only">
          {title} dialog window. Drag the header to move this dialog.
        </div>
        {children}
      </div>
    </Dialog.Content>
  );
};
