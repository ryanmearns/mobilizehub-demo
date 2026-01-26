import { cn } from '@/lib/utils'
import { Media } from '@/payload-types'
import Image from 'next/image'

export type PayloadImage = Media | number

export function PayloadImage({
  image,
  className = '',
}: {
  image: PayloadImage
  className?: string
}) {
  if (typeof image === 'number' || !image?.url) {
    return null
  }
  return (
    <Image
      src={image.url}
      alt={image.alt}
      width={1000}
      height={1000}
      className={cn('object-cover', className)}
    />
  )
}
