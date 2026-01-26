import { RichText } from '@/components/ui/richtext'
import { ContentBlock as ContentBlockType } from '@/payload-types'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export function ContentBlock(props: ContentBlockType) {
  return (
    <section className="mx-auto max-w-7xl px-6 md:px-12">
      <div className="mx-auto max-w-3xl">
        <RichText data-slot="content" data={props.richText as SerializedEditorState} />
      </div>
    </section>
  )
}
