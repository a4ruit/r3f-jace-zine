import React from 'react';
import { useAtom } from 'jotai';
import { pageAtom, pages } from './UI';
import { Html } from '@react-three/drei';

const PageControls = () => {
  const [currentPage, setPage] = useAtom(pageAtom);
  return (
    <Html
      position={[0, -1, 0]}
      transform
      scale={0.06}
      occlude
    >
      <div className="flex gap-2">
        {currentPage > 0 && (
          <button
            onClick={() => setPage(currentPage - 1)}
            className="pointer-events-auto p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}
       
        {currentPage < pages.length && (
          <button
            onClick={() => setPage(currentPage + 1)}
            className="pointer-events-auto p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        )}
      </div>
    </Html>
  );
};

export default PageControls;