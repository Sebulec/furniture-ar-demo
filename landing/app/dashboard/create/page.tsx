'use client'

import { useState, useCallback } from 'react'
import { createClient } from '@/utils/supabase/client'
import { createGeneration } from '../actions'
import { UploadCloud, Loader2, FileIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function CreatePage() {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  // Product Name State
  const [productName, setProductName] = useState('')

  // Dimensions State
  const [dimensions, setDimensions] = useState({
    width: '',
    height: '',
    depth: ''
  })

  const router = useRouter()
  const supabase = createClient()

  const handleFileChange = (selectedFile: File) => {
    setFile(selectedFile)
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(URL.createObjectURL(selectedFile))
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true)
    } else if (e.type === 'dragleave') {
      setIsDragging(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0])
    }
  }, [previewUrl])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0])
    }
  }

  const handleDimensionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDimensions(prev => ({ ...prev, [name]: value }))
  }

  const handleUpload = async () => {
    if (!file) return
    if (!productName.trim()) {
        alert("Please enter a product name")
        return
    }
    if (!dimensions.width || !dimensions.height || !dimensions.depth) {
        alert("Please enter all dimensions")
        return
    }

    setIsUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      await createGeneration(filePath, dimensions, productName)
    } catch (error: any) {
      // Ignore Next.js Redirect errors
      if (error.message === 'NEXT_REDIRECT' || error.digest?.includes('NEXT_REDIRECT')) {
        throw error
      }
      console.error('Error uploading:', error)
      alert('Error uploading file')
      setIsUploading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create New Model</h1>
        <p className="text-slate-400">Upload a photo and specify dimensions to generate your AR asset.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Col: Upload */}
        <div
            className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ease-in-out flex flex-col items-center justify-center min-h-[400px] overflow-hidden ${
            isDragging
                ? 'border-[#00f0ff] bg-[#00f0ff]/5'
                : 'border-[#1e293b] bg-[#0f172a]/50 hover:border-[#00f0ff]/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            onChange={handleChange}
            accept="image/*"
            disabled={isUploading}
            />

            {isUploading ? (
            <div className="text-center z-10">
                <Loader2 className="w-16 h-16 text-[#00f0ff] animate-spin mb-4 mx-auto" />
                <p className="text-xl font-medium text-[#00f0ff]">Uploading & Processing...</p>
                <p className="text-slate-400 mt-2">Initiating quantum scan protocol</p>
            </div>
            ) : file && previewUrl ? (
            <div className="text-center z-10 flex flex-col items-center w-full h-full py-4">
                <div className="relative w-full aspect-square max-w-[300px] mb-6 rounded-xl overflow-hidden border border-[#00f0ff]/30 shadow-[0_0_20px_rgba(0,240,255,0.1)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                />
                </div>
                <div className="pointer-events-none">
                    <p className="text-lg font-medium text-white mb-1">{file.name}</p>
                    <p className="text-sm text-slate-400 mb-4">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <div className="z-30 pointer-events-auto">
                    <button
                    className="px-6 py-2 bg-[#1e293b] text-slate-300 rounded-full text-xs border border-slate-700 hover:border-[#00f0ff]/50 hover:text-[#00f0ff] transition-all"
                    >
                    Change Image
                    </button>
                </div>
            </div>
            ) : (
            <div className="text-center pointer-events-none">
                <div className="w-20 h-20 bg-[#1e293b] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-10 h-10 text-slate-400 group-hover:text-[#00f0ff]" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">
                Drag & Drop your image
                </h3>
                <p className="text-slate-400 mb-6 max-w-sm mx-auto">
                Supports JPG, PNG. High contrast images work best.
                </p>
                <span className="px-6 py-3 bg-[#00f0ff] text-[#050a14] font-bold rounded-lg hover:bg-[#00f0ff]/90 transition-colors uppercase tracking-wide text-sm">
                Browse Files
                </span>
            </div>
            )}
        </div>

        {/* Right Col: Dimensions & Actions */}
        <div className="flex flex-col justify-center space-y-6">
            <div className="bg-[#0f172a]/50 p-6 rounded-2xl border border-[#1e293b]">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-[#00f0ff] rounded-full"></span>
                    Product Details
                </h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Product Name</label>
                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            placeholder="e.g. Modern Leather Sofa"
                            className="w-full bg-[#0a0f1c] border border-[#1e293b] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00f0ff] transition-colors"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-[#0f172a]/50 p-6 rounded-2xl border border-[#1e293b]">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-[#00f0ff] rounded-full"></span>
                    Physical Dimensions (cm)
                </h3>
                <p className="text-slate-400 text-sm mb-6">
                    Enter the exact real-world dimensions of the object. The AI will scale the generated model to match these bounds.
                </p>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Width (cm)</label>
                        <input 
                            type="number" 
                            name="width"
                            value={dimensions.width}
                            onChange={handleDimensionChange}
                            placeholder="e.g. 200"
                            className="w-full bg-[#0a0f1c] border border-[#1e293b] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00f0ff] transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Height (cm)</label>
                        <input 
                            type="number" 
                            name="height"
                            value={dimensions.height}
                            onChange={handleDimensionChange}
                            placeholder="e.g. 85"
                            className="w-full bg-[#0a0f1c] border border-[#1e293b] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00f0ff] transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Depth (cm)</label>
                        <input 
                            type="number" 
                            name="depth"
                            value={dimensions.depth}
                            onChange={handleDimensionChange}
                            placeholder="e.g. 95"
                            className="w-full bg-[#0a0f1c] border border-[#1e293b] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00f0ff] transition-colors"
                        />
                    </div>
                </div>
            </div>

            {file && (
                <button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="w-full py-4 bg-[#00f0ff] text-[#050a14] font-bold rounded-xl hover:bg-[#00f0ff]/90 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] uppercase tracking-wide flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isUploading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            <UploadCloud className="w-5 h-5" />
                            Generate AR Model
                        </>
                    )}
                </button>
            )}
        </div>
      </div>
    </div>
  )
}