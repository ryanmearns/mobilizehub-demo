import { HeroBlock as HeroBlockType } from '@/payload-types'
import { PayloadImage } from '../payload-image'
import { PayloadLink } from '../payload-link'
import { Button } from '../ui/button'

export function HeroBlock({ headline, subheadline, image, buttons }: HeroBlockType) {
  return (
    <section className="bg-muted">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          <div className="flex flex-col gap-4 md:gap-6 self-center py-0 md:py-12">
            <h1 className="text-primary text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              {headline}
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl">{subheadline}</p>

            {buttons && buttons.length > 0 && (
              <div className="mt-4 md:mt-6 flex flex-wrap gap-2 md:gap-3">
                {buttons?.map((button, index) => {
                  const variant = button.style || 'default'
                  return (
                    <PayloadLink key={index} link={button.link}>
                      <Button variant={variant} size="lg">
                        {button.label}
                      </Button>
                    </PayloadLink>
                  )
                })}
              </div>
            )}
          </div>
          {image && (
            <div className="relative">
              <PayloadImage image={image} className="aspect-square rounded-md" />
            </div>
          )}{' '}
        </div>
      </div>
    </section>
  )
}
