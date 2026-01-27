'use client'

import { Loader2, Box, AlertCircle, Download, Eye, RefreshCw } from 'lucide-react'
import Image from 'next/image'
import { retryGeneration } from '@/app/dashboard/actions'
import { useState } from 'react'

interface Generation {
  id: string
  status: 'processing' | 'completed' | 'failed'
  input_image_url: string
  glb_url: string | null
  usdz_url: string | null
  created_at: string
}

export function ModelCard({ model }: { model: Generation }) {
  const [isRetrying, setIsRetrying] = useState(false)

  // Check if model is in an active processing state
  const isProcessing = model.status === 'processing'

  const progressMessage = 'Generating 3D model...'

  const handleRetry = async () => {
    setIsRetrying(true)
    try {
      await retryGeneration(model.id)
    } catch (error) {
      console.error('Retry failed:', error)
      alert('Failed to retry generation. Please try again.')
      setIsRetrying(false)
    }
  }

  return (
    <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl overflow-hidden hover:border-[#00f0ff]/30 transition-all group">
      {/* Image / Preview Area */}
      <div className="relative aspect-square bg-[#050a14] overflow-hidden">
        {model.input_image_url && (
          <Image
            src={model.input_image_url}
            alt="Model Input"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={isProcessing}
            className={`object-cover transition-opacity duration-500 ${
              isProcessing ? 'opacity-50' : 'opacity-100'
            }`}
          />
        )}

        {/* Status Overlays */}
        {(isProcessing || isRetrying) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
            <Loader2 className="w-10 h-10 text-[#00f0ff] animate-spin mb-3" />
            <span className="text-white text-sm font-medium">
              {isRetrying ? 'Restarting generation...' : progressMessage}
            </span>
          </div>
        )}

        {model.status === 'failed' && !isRetrying && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/20 backdrop-blur-sm">
            <AlertCircle className="w-10 h-10 text-red-400 mb-2" />
            <span className="text-red-400 text-sm font-medium">Generation Failed</span>
          </div>
        )}

        {model.status === 'completed' && (
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-[#00f0ff] text-[#050a14] text-xs font-bold px-2 py-1 rounded">READY</span>
            </div>
        )}
      </div>

      {/* Info / Actions */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-medium text-slate-200 text-sm truncate w-32">
                Generation #{model.id.slice(0, 6)}
            </h3>
            <p className="text-xs text-slate-500">
                {new Date(model.created_at).toLocaleDateString()}
            </p>
          </div>
          <Box className={`w-5 h-5 ${
              model.status === 'completed' ? 'text-[#00f0ff]' : 'text-slate-600'
          }`} />
        </div>

        {model.status === 'completed' ? (
          <div className="grid grid-cols-2 gap-2">
            <button 
                onClick={() => window.open(model.glb_url!, '_blank')}
                className="flex items-center justify-center gap-2 bg-[#1e293b] hover:bg-[#2d3b55] text-slate-300 text-xs py-2 rounded transition-colors"
            >
              <Download size={14} /> GLB
            </button>
            <button 
                onClick={() => window.open(model.usdz_url || model.glb_url!, '_blank')}
                className="flex items-center justify-center gap-2 bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 text-[#00f0ff] text-xs py-2 rounded transition-colors border border-[#00f0ff]/20"
            >
              <Eye size={14} /> AR View
            </button>
          </div>
        ) : model.status === 'failed' ? (
          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className="w-full h-[34px] flex items-center justify-center gap-2 text-xs font-medium bg-red-900/20 hover:bg-red-900/30 text-red-400 hover:text-red-300 rounded border border-red-800/50 hover:border-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRetrying ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                Restarting...
              </>
            ) : (
              <>
                <RefreshCw className="w-3 h-3" />
                Retry Generation
              </>
            )}
          </button>
        ) : (
          <div className="h-[34px] flex items-center justify-center text-xs text-slate-400 italic bg-[#1e293b]/50 rounded border border-dashed border-[#1e293b]">
            <span className="flex items-center gap-2">
              <Loader2 className="w-3 h-3 animate-spin" />
              Processing...
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
