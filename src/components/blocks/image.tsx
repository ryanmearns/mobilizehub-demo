import { PayloadImage } from '@/components/payload-image'
import { Media } from '@/payload-types'

interface ImageBlockProps {
  image: number | Media
  caption?: string | null
}

export function ImageBlock({ image, caption }: ImageBlockProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 md:px-12">
      <figure>
        <PayloadImage image={image} className="aspect-video w-full rounded-3xl" />
        {caption && (
          <figcaption className="text-muted-foreground mt-3 text-center text-sm">
            {caption}
          </figcaption>
        )}
      </figure>
    </section>
  )
}
