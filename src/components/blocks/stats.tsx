import { StatsBlock as StatsBlockType } from '@/payload-types'

export function StatsBlock({ headline, description, stats }: StatsBlockType) {
  return (
    <section className="mx-auto max-w-7xl px-6 md:px-12">
      {(headline || description) && (
        <div className="mx-auto flex max-w-xl flex-col items-center justify-center gap-3">
          {headline && (
            <h2 className="text-primary text-center text-3xl font-bold tracking-tight md:text-4xl">
              {headline}
            </h2>
          )}
          {description && (
            <p className="text-muted-foreground mt-2 text-center text-base leading-relaxed md:text-lg">
              {description}
            </p>
          )}
        </div>
      )}

      {stats && stats.length > 0 && (
        <div className="mt-12 grid gap-12 divide-y *:text-center md:grid-cols-3 md:gap-2 md:divide-x md:divide-y-0">
          {stats.map((stat) => (
            <div key={stat.id} className="space-y-4">
              <div className="text-primary text-4xl font-bold">{stat.value}</div>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
