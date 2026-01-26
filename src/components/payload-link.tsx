import Link from 'next/link'
import { CollectionSlug } from 'payload'
import React from 'react'

export type PayloadLinkType =
  | {
      type?: ('reference' | 'custom') | null
      page?: {
        relationTo: CollectionSlug
        value:
          | number
          | {
              slug: string
            }
      } | null
      url?: string | null
      openInNewTab?: boolean | null
    }
  | undefined

export function PayloadLink(
  props: React.ComponentPropsWithoutRef<'a'> & {
    link: PayloadLinkType
  },
) {
  const pathname =
    props.link?.type === 'reference' && props.link.page
      ? typeof props.link.page.value === 'number'
        ? '' // handle numeric IDs if necessary
        : (props.link.page.value as { slug: string }).slug
      : props.link?.url || ''

  return (
    <Link
      className={props.className}
      href={`/${pathname}`}
      target={props.link?.openInNewTab ? '_blank' : '_self'}
    >
      {props.children}
    </Link>
  )
}
