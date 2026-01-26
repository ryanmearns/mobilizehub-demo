import { HeaderBlock as HeaderBlockType } from '@/payload-types'

export function HeaderBlock({ headline }: HeaderBlockType) {
  return (
    <section className="bg-muted">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-primary text-center text-4xl font-bold tracking-tight md:text-5xl">
            {headline}
          </h2>
        </div>
      </div>
    </section>
  )
}
