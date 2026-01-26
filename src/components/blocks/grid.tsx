import { PayloadLink } from '@/components/payload-link'
import { GridBlock as GridBlockType, Media } from '@/payload-types'
import Image from 'next/image'

export function GridBlock({ headline, items }: GridBlockType) {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <section className="mx-auto max-w-7xl px-6 md:px-12">
      {headline && (
        <div className="mx-auto max-w-3xl">
          <h2 className="text-primary text-center text-3xl font-bold tracking-tight md:text-4xl">
            {headline}
          </h2>
        </div>
      )}
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const image = item.image as Media | null
          const content = (
            <div
              key={item.id}
              className="group/item bg-muted/50 focus-visible:border-ring focus-visible:ring-ring/50 [a]:hover:bg-accent/50 flex flex-wrap items-center gap-4 rounded-md border border-transparent p-4 text-sm transition-colors duration-100 outline-none focus-visible:ring-[3px] [a]:transition-colors"
            >
              {image?.url && (
                <div className="flex basis-full items-center justify-between gap-2">
                  <Image
                    src={image.url}
                    alt={image.alt || item.title || ''}
                    width={200}
                    height={200}
                    className="aspect-video w-full rounded-sm object-cover"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col gap-1">
                {item.title && (
                  <div className="flex w-fit items-center gap-2 text-lg leading-snug font-semibold">
                    {item.title}
                  </div>
                )}
                {item.description && (
                  <p className="text-muted-foreground [&>a:hover]:text-primary line-clamp-4 text-base leading-normal font-normal text-balance [&>a]:underline [&>a]:underline-offset-4">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          )

          if (item.link?.type || item.link?.url) {
            return (
              <PayloadLink key={item.id} link={item.link} className="block">
                {content}
              </PayloadLink>
            )
          }

          return content
        })}
      </div>
    </section>
  )
}
