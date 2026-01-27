'use client'

import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/utils/supabase/client'
import { ModelCard } from '@/components/dashboard/ModelCard'
import { PlusCircle, Box } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const supabase = createClient()

  const { data: generations, isLoading } = useQuery({
    queryKey: ['generations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('generations')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    },
    // Refetch if any item is still being processed
    refetchInterval: (query) => {
        const data = query.state.data as any[] | undefined
        const hasActiveGeneration = data?.some(item => item.status === 'processing')
        return hasActiveGeneration ? 3000 : false
    }
  })

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="aspect-[4/5] bg-[#0f172a] rounded-xl animate-pulse border border-[#1e293b]" />
        ))}
      </div>
    )
  }

  if (!generations || generations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <div className="w-24 h-24 bg-[#1e293b] rounded-full flex items-center justify-center mb-6">
            <Box className="w-12 h-12 text-slate-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">No models yet</h2>
        <p className="text-slate-400 mb-8 max-w-md">
          Start by uploading your first furniture product. We'll generate the AR assets automatically.
        </p>
        <Link 
            href="/dashboard/create"
            className="flex items-center gap-2 px-6 py-3 bg-[#00f0ff] text-[#050a14] font-bold rounded-lg hover:bg-[#00f0ff]/90 transition-colors uppercase tracking-wide"
        >
            <PlusCircle size={20} />
            Create First Model
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold text-white">My Models</h1>
            <p className="text-slate-400">Manage your AR assets.</p>
        </div>
        <Link 
            href="/dashboard/create"
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#1e293b] text-slate-300 hover:text-white border border-[#1e293b] hover:border-[#00f0ff]/50 rounded-lg transition-all text-sm font-medium"
        >
            <PlusCircle size={16} />
            New Scan
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {generations.map((model) => (
          // @ts-ignore
          <ModelCard key={model.id} model={model} />
        ))}
      </div>
    </div>
  )
}
