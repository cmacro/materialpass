import { cn } from '@/lib/utils'
import { ProcurementPage } from '@/pages/procurement/ProcurementPage'

interface MainWindowContentProps {
  children?: React.ReactNode
  className?: string
}

export function MainWindowContent({
  children,
  className,
}: MainWindowContentProps) {
  return (
    <div className={cn('flex h-full flex-col bg-background', className)}>
      {children || <ProcurementPage />}
    </div>
  )
}
