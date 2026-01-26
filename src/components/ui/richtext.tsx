'use client'
import type { DefaultNodeTypes, SerializedLinkNode } from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  JSXConverters,
  type JSXConvertersFunction,
  RichText as LexicalRichText,
} from '@payloadcms/richtext-lexical/react'
import { cva, VariantProps } from 'class-variance-authority'
import Link from 'next/link'
import React from 'react'

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value } = linkNode.fields.doc!

  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug as string

  return `/${slug}`
}

export const linkConverter: JSXConverters<SerializedLinkNode> = {
  link: ({ node, nodesToJSX }) => {
    const text = nodesToJSX({ nodes: node.children }).map((child, index) => (
      <React.Fragment key={index}>{child}</React.Fragment>
    ))
    if (node.fields.linkType === 'custom') {
      return (
        <Link href={node.fields.url || ''} target={node.fields.newTab ? '_blank' : undefined}>
          {text}
        </Link>
      )
    }
    const href = internalDocToHref({ linkNode: node })
    return <Link href={href}>{text}</Link>
  },
}

const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...linkConverter,
})

const richText = cva(
  [
    // Base prose styles
    'prose prose-zinc max-w-none prose-img:rounded-lg prose-headings:mt-0 prose-p:mt-0 prose-last:mb-0 [&_:last-child]:mb-0',
    // Link styles
    'prose-a:no-underline prose-a:decoration-blue-400 prose-a:decoration-2 prose-a:text-blue-600 prose-a:underline-offset-4 prose-a:hover:underline prose-a:hover:decoration-blue-500 prose-a:hover:text-blue-700',
  ],
  {
    variants: {
      size: {
        small: 'prose-sm',
        base: 'prose-base',
      },
    },
    defaultVariants: { size: 'base' },
  },
)

interface RichTextProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>, VariantProps<typeof richText> {
  data: SerializedEditorState
}

export function RichText({ className, data, size, ...props }: RichTextProps) {
  return (
    <div {...props} className={richText({ size, className })}>
      <LexicalRichText converters={jsxConverters} data={data} />
    </div>
  )
}
