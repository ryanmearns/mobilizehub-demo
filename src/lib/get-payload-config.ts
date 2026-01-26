import config from '@payload-config'
import { getPayload } from 'payload'

export function getPayloadConfig() {
  const payload = getPayload({ config: config })

  return payload
}
