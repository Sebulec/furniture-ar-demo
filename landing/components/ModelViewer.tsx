'use client';

import '@google/model-viewer';

export default function ModelViewer() {
  return (
    <div className="w-full h-full relative bg-gray-800">
      {/* @ts-ignore */}
      <model-viewer
        src="/bach.glb"
        alt="A 3D model of a table"
        auto-rotate
        camera-controls
        ar
        shadow-intensity="1"
        ar-modes="webxr scene-viewer quick-look"
        style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
      />
    </div>
  );
}
