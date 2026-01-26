import { Media, TeamBlock as TeamBlockType } from '@/payload-types'

export function TeamBlock({ headline, members }: TeamBlockType) {
  if (!members || members.length === 0) {
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
      <div className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => {
          const photo = member.photo as Media | null
          return (
            <div key={member.id} className="flex flex-col items-center text-center">
              {photo?.url && (
                <img
                  src={photo.url}
                  alt={photo.alt || member.name || ''}
                  className="aspect-video rounded-md object-cover"
                />
              )}
              {member.name && (
                <h3 className="text-primary mt-6 text-lg font-semibold">{member.name}</h3>
              )}
              {member.role && <p className="text-muted-foreground mt-1 text-sm">{member.role}</p>}
            </div>
          )
        })}
      </div>
    </section>
  )
}
