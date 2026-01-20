'use client';

import '@google/model-viewer';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        alt?: string;
        poster?: string;
        'auto-rotate'?: boolean;
        'camera-controls'?: boolean;
        ar?: boolean;
        'shadow-intensity'?: string;
        'environment-image'?: string;
        exposure?: string;
        'ar-modes'?: string;
        'ar-scale'?: string;
      };
    }
  }
}

export default function ModelViewer() {
  return (
    <div className="w-full h-full relative bg-gray-800">
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
