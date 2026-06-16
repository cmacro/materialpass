import React, { useState } from 'react'
import {
  useProcurementItems,
  useCreateProcurementItem,
  useUpdateProcurementItem,
  useDeleteProcurementItem,
} from '@/hooks/use-procurement'
import type { ProcurementItem } from '@/lib/bindings'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

export function ProcurementPage() {
  const { t } = useTranslation()
  const { data: items, isLoading } = useProcurementItems()
  const createMutation = useCreateProcurementItem()
  const updateMutation = useUpdateProcurementItem()
  const deleteMutation = useDeleteProcurementItem()

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<ProcurementItem | null>(null)

  const handleCreateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const item: ProcurementItem = {
      product_id: formData.get('product_id') as string,
      project: formData.get('project') as string,
      specifications: (formData.get('specifications') as string) || null,
      expected_quantity: parseFloat(
        formData.get('expected_quantity') as string
      ),
      cost: parseFloat(formData.get('cost') as string),
    }

    createMutation.mutate(item, {
      onSuccess: () => {
        toast.success(t('procurement.createSuccess'))
        setIsCreateOpen(false)
      },
      onError: (error: Error) => {
        toast.error(error.message || t('procurement.createError'))
      },
    })
  }

  const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingItem) return
    const formData = new FormData(e.currentTarget)
    const item: ProcurementItem = {
      ...editingItem,
      project: formData.get('project') as string,
      specifications: (formData.get('specifications') as string) || null,
      expected_quantity: parseFloat(
        formData.get('expected_quantity') as string
      ),
      cost: parseFloat(formData.get('cost') as string),
    }

    updateMutation.mutate(item, {
      onSuccess: () => {
        toast.success(t('procurement.updateSuccess'))
        setIsEditOpen(false)
      },
      onError: (error: Error) => {
        toast.error(error.message || t('procurement.updateError'))
      },
    })
  }

  const handleDelete = (productId: string) => {
    if (confirm(t('procurement.deleteConfirm'))) {
      deleteMutation.mutate(productId, {
        onSuccess: () => toast.success(t('procurement.deleteSuccess')),
        onError: (error: Error) =>
          toast.error(error.message || t('procurement.deleteError')),
      })
    }
  }

  if (isLoading)
    return <div className="p-6 text-center">{t('common.loading')}</div>

  return (
    <div className="flex flex-col h-full p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t('procurement.title')}</h1>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>{t('procurement.addButton')}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('procurement.addItemTitle')}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product_id">{t('procurement.productId')}</Label>
                <Input name="product_id" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project">{t('procurement.project')}</Label>
                <Input name="project" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specifications">
                  {t('procurement.specifications')}
                </Label>
                <Input name="specifications" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expected_quantity">
                    {t('procurement.expectedQuantity')}
                  </Label>
                  <Input name="expected_quantity" type="number" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost">{t('procurement.cost')}</Label>
                  <Input name="cost" type="number" step="0.01" required />
                </div>
              </div>
              <Button type="submit" className="w-full">
                {t('common.save')}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('procurement.productId')}</TableHead>
              <TableHead>{t('procurement.project')}</TableHead>
              <TableHead>{t('procurement.specifications')}</TableHead>
              <TableHead>{t('procurement.expectedQuantity')}</TableHead>
              <TableHead>{t('procurement.cost')}</TableHead>
              <TableHead className="text-right">
                {t('common.actions')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items?.map(item => (
              <TableRow key={item.product_id}>
                <TableCell className="font-medium">{item.product_id}</TableCell>
                <TableCell>{item.project}</TableCell>
                <TableCell>{item.specifications}</TableCell>
                <TableCell>{item.expected_quantity}</TableCell>
                <TableCell>{item.cost}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingItem(item)
                      setIsEditOpen(true)
                    }}
                  >
                    {t('common.edit')}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive"
                    onClick={() => handleDelete(item.product_id)}
                  >
                    {t('common.delete')}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('procurement.editItemTitle')}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="product_id">{t('procurement.productId')}</Label>
              <Input
                name="product_id"
                value={editingItem?.product_id}
                readOnly
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project">{t('procurement.project')}</Label>
              <Input
                name="project"
                defaultValue={editingItem?.project}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specifications">
                {t('procurement.specifications')}
              </Label>
              <Input
                name="specifications"
                defaultValue={editingItem?.specifications || ''}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expected_quantity">
                  {t('procurement.expectedQuantity')}
                </Label>
                <Input
                  name="expected_quantity"
                  type="number"
                  required
                  defaultValue={editingItem?.expected_quantity}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost">{t('procurement.cost')}</Label>
                <Input
                  name="cost"
                  type="number"
                  step="0.01"
                  required
                  defaultValue={editingItem?.cost}
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              {t('common.save')}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
