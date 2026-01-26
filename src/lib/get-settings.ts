import { getPayload } from 'payload'
import config from '@payload-config'

export async function getSettings() {
  const payload = await getPayload({ config })

  const settings = await payload.findGlobal({
    slug: 'settings',
  })

  return settings
}
