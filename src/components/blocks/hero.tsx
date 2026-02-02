import { HeroBlock as HeroBlockType } from '@/payload-types'
import { PayloadImage } from '../payload-image'
import { PayloadLink } from '../payload-link'
import { Button } from '../ui/button'

export function HeroBlock({ headline, subheadline, image, buttons }: HeroBlockType) {
  return (
    <section className="bg-muted">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          <div className="flex flex-col gap-4 lg:gap-6 self-center py-0 lg:py-12">
            <h1 className="text-primary text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              {headline}
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg lg:text-xl">{subheadline}</p>

            {buttons && buttons.length > 0 && (
              <div className="mt-4 lg:mt-6 flex flex-wrap gap-2 lg:gap-3">
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
