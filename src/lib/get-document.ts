import { Form, Page, Petition } from '@/payload-types'
import config from '@payload-config'
import { CollectionSlug, getPayload } from 'payload'

export async function getDocument(slug: string) {
  const payload = await getPayload({ config })

  const COLLECTIONS: Array<CollectionSlug> = ['pages', 'forms', 'petitions']

  for (const collection of COLLECTIONS) {
    const { docs } = await payload.find({
      collection: collection,
      where: {
        slug: { equals: slug },
        and: [{ status: { equals: 'published' } }],
      },
    })

    if (docs.length > 0) {
      if (collection === 'pages') {
        const page = docs[0] as Page

        return {
          success: true,
          collection,
          doc: page,
        }
      }

      if (collection === 'forms') {
        const form = docs[0] as Form

        return {
          success: true,
          collection,
          doc: form,
        }
      }

      if (collection === 'petitions') {
        const petition = docs[0] as Petition

        const { totalDocs } = await payload.count({
          collection: 'petitionSignatures',
          where: {
            petition: { equals: petition.id },
          },
        })

        return {
          success: true,
          collection,
          doc: { ...petition, signatureCount: totalDocs },
        }
      }
    }
  }

  return {
    success: false,
    error: 'Document not found',
  }
}
