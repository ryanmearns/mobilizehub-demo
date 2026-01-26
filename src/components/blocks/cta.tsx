import { CTABlock as CTABlockType } from '@/payload-types'
import { PayloadLink } from '../payload-link'
import { Button } from '../ui/button'

export function CTABlock({ headline, description, buttons }: CTABlockType) {
  return (
    <section className="bg-muted">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-24">
        <div className="mx-auto flex max-w-xl flex-col items-center justify-center gap-3">
          <h2 className="text-primary text-center text-3xl font-bold tracking-tight md:text-4xl">
            {headline}
          </h2>
          <p className="text-muted-foreground mt-2 text-center text-base leading-relaxed md:text-lg">
            {description}
          </p>
          {buttons && buttons.length > 0 && (
            <div className="mt-6 flex gap-3">
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
      </div>
    </section>
  )
}
