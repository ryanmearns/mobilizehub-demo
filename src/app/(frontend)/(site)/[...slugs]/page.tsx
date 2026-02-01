import { FormTemplate } from '@/components/templates/form'
import { PageTemplate } from '@/components/templates/page'
import { PetitionTemplate } from '@/components/templates/petition'
import { getDocument } from '@/lib/get-document'
import { countries } from '@mobilizehub/payload-plugin/helpers'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function NextPage({ params }: { params: Promise<{ slugs: string[] }> }) {
  const { slugs } = await params

  let pathname = 'home'

  if (slugs && slugs.length > 0) {
    pathname = slugs.join('/')
  }

  const result = await getDocument(pathname)

  if (!result.success) {
    return notFound()
  }

  switch (result.collection) {
    case 'pages':
      return <PageTemplate {...result.doc} />
    case 'forms':
      return <FormTemplate {...result.doc} countries={countries} />
    case 'petitions':
      return <PetitionTemplate {...result.doc} countries={countries} />
    default:
      return notFound()
  }
}
