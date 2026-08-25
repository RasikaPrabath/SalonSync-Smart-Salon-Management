import { Sidebar } from '@/components/layout/sidebar'
import { BottomTabBar } from '@/components/layout/bottom-tab-bar'
import { TopNav } from '@/components/layout/top-nav'
import { ToastProvider } from '@/components/ui/toaster'

export const dynamic = 'force-dynamic'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-[hsl(var(--background))]">
        {/* Desktop sidebar */}
        <Sidebar />

        {/* Mobile top nav */}
        <TopNav />

        {/* Main content */}
        <main className="lg:pl-[220px] pb-20 lg:pb-0">
          <div className="max-w-5xl mx-auto px-4 lg:px-6 py-5 lg:py-7">
            {children}
          </div>
        </main>

        {/* Mobile bottom tab bar */}
        <BottomTabBar />
      </div>
    </ToastProvider>
  )
}
