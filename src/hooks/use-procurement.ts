import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { commands, unwrapResult } from '@/lib/tauri-bindings'
import type { ProcurementItem } from '@/lib/bindings'

export function useProcurementItems() {
  return useQuery({
    queryKey: ['procurement-items'],
    queryFn: async () => {
      const result = await commands.getProcurementItems()
      return unwrapResult(result)
    },
  })
}

export function useCreateProcurementItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (item: ProcurementItem) => {
      const result = await commands.createProcurementItem(item)
      unwrapResult(result)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['procurement-items'] })
    },
  })
}

export function useUpdateProcurementItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (item: ProcurementItem) => {
      const result = await commands.updateProcurementItem(item)
      unwrapResult(result)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['procurement-items'] })
    },
  })
}

export function useDeleteProcurementItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (productId: string) => {
      const result = await commands.deleteProcurementItem(productId)
      unwrapResult(result)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['procurement-items'] })
    },
  })
}
