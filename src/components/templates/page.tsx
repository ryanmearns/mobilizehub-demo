import { Page } from '@/payload-types'
import { HeroBlock } from '../blocks/hero'
import { CTABlock } from '../blocks/cta'
import { ContentBlock } from '../blocks/content'
import { HeaderBlock } from '../blocks/header'
import { TeamBlock } from '../blocks/team'
import { GridBlock } from '../blocks/grid'
import { ImageBlock } from '../blocks/image'
import { LogosBlock } from '../blocks/logos'
import { StatsBlock } from '../blocks/stats'

export function PageTemplate(props: Page) {
  return (
    <div className="space-y-12 md:space-y-32">
      {props?.blocks?.map((block) => {
        switch (block.blockType) {
          case 'Hero':
            return <HeroBlock key={block.id} {...block} />
          case 'CTA':
            return <CTABlock key={block.id} {...block} />
          case 'content':
            return <ContentBlock key={block.id} {...block} />
          case 'Header':
            return <HeaderBlock key={block.id} {...block} />
          case 'Team':
            return <TeamBlock key={block.id} {...block} />
          case 'Grid':
            return <GridBlock key={block.id} {...block} />
          case 'Image':
            return <ImageBlock key={block.id} {...block} />
          case 'Logos':
            return <LogosBlock key={block.id} {...block} />
          case 'Stats':
            return <StatsBlock key={block.id} {...block} />
          default:
            return null
        }
      })}
    </div>
  )
}
