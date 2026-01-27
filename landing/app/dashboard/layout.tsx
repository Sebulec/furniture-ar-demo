import { Sidebar } from '@/components/dashboard/Sidebar'
import QueryProvider from '@/components/providers/QueryProvider'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryProvider>
      <div className="min-h-screen bg-[#0a0f1c] text-slate-200">
        <Sidebar />
        <main className="md:ml-64 min-h-screen">
          <div className="p-6 md:p-12 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </QueryProvider>
  )
}
