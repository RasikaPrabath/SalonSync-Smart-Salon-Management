import { getStaff } from '@/app/actions/staff'
import { TeamSettingsClient } from './team-client'

export default async function TeamSettingsPage() {
  const { data } = await getStaff()
  
  return <TeamSettingsClient staff={data || []} />
}
