import { PayloadLink } from '@/components/payload-link'
import { LogosBlock as LogosBlockType, Media } from '@/payload-types'
import Image from 'next/image'

export function LogosBlock({ headline, logos }: LogosBlockType) {
  if (!logos || logos.length === 0) {
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
      <div className="mt-12 flex flex-wrap items-center justify-center gap-y-8 divide-x">
        {logos.map((logo) => {
          const image = logo.image as Media
          if (logo.link?.type || logo.link?.url) {
            return (
              <PayloadLink key={logo.id} link={logo.link} className="shrink-0 px-12">
                <Image
                  src={image.url || ''}
                  alt={image.alt || logo.name || ''}
                  width={image.width || 100}
                  height={image.height || 100}
                  className="max-h-12 w-auto object-contain grayscale transition-all hover:grayscale-0"
                />
              </PayloadLink>
            )
          }
        })}
      </div>
    </section>
  )
}
