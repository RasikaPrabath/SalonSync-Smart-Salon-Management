import { getInventory } from '@/app/actions/inventory'
import { redirect } from 'next/navigation'
import { InventoryClient } from './inventory-client'

export default async function InventoryPage() {
  const { data, error } = await getInventory()

  if (error === 'Unauthorized') {
    redirect('/login')
  }

  return <InventoryClient inventory={data || []} />
}
