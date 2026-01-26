import { mobilizehubPlugin } from '@mobilizehub/payload-plugin'
import { resendAdapter } from '@mobilizehub/payload-plugin/adapters'
import { renderEmailTemplate } from '@/lib/render-email-template'
import { LinkField } from './fields/link'

export const mobilizehub = mobilizehubPlugin({
  broadcastConfig: {
    batchSize: 100,
    broadcastQueueName: 'email-broadcasts',
    emailQueueName: 'email-send',
    taskSchedule: '* * * * *', // every 1 minute
  },
  pagesOverrides: {
    blocks: ({ defaultBlocks }) => [
      ...defaultBlocks,
      {
        slug: 'Hero',
        labels: {
          singular: 'Hero',
          plural: 'Heroes',
        },
        fields: [
          {
            name: 'headline',
            type: 'text',
            label: 'Headline',
          },
          {
            name: 'subheadline',
            type: 'text',
            label: 'Subheadline',
          },
          {
            name: 'image',
            type: 'upload',
            label: 'Image',
            relationTo: 'media',
          },
          {
            name: 'buttons',
            type: 'array',
            fields: [
              {
                name: 'label',
                type: 'text',
                required: true,
              },
              LinkField,
              {
                name: 'style',
                type: 'select',
                admin: {
                  description: 'Select the style for this button.',
                },
                options: [
                  {
                    label: 'Default',
                    value: 'default',
                  },
                  {
                    label: 'Secondary',
                    value: 'secondary',
                  },
                  {
                    label: 'Outline',
                    value: 'outline',
                  },
                  {
                    label: 'Link',
                    value: 'link',
                  },
                  {
                    label: 'Ghost',
                    value: 'ghost',
                  },
                ],
                defaultValue: 'default',
                required: true,
              },
            ],
          },
        ],
        interfaceName: 'HeroBlock',
      },
      {
        slug: 'Header',
        labels: {
          singular: 'Header',
          plural: 'Headers',
        },
        fields: [
          {
            name: 'headline',
            type: 'text',
            label: 'Headline',
          },
        ],
        interfaceName: 'HeaderBlock',
      },
      {
        slug: 'Grid',
        labels: {
          singular: 'Grid',
          plural: 'Grids',
        },
        fields: [
          {
            name: 'headline',
            type: 'text',
            label: 'Headline',
          },
          {
            name: 'items',
            type: 'array',
            fields: [
              {
                name: 'title',
                type: 'text',
                label: 'Title',
              },
              {
                name: 'description',
                type: 'text',
                label: 'Description',
              },
              {
                name: 'image',
                type: 'upload',
                label: 'Image',
                relationTo: 'media',
              },
              LinkField,
            ],
          },
        ],
        interfaceName: 'GridBlock',
      },
      {
        slug: 'Image',
        labels: {
          singular: 'Image',
          plural: 'Images',
        },
        fields: [
          {
            name: 'image',
            type: 'upload',
            label: 'Image',
            relationTo: 'media',
            required: true,
          },
          {
            name: 'caption',
            type: 'text',
            label: 'Caption',
          },
        ],
        interfaceName: 'ImageBlock',
      },
      {
        slug: 'CTA',
        labels: {
          singular: 'CTA',
          plural: 'CTAs',
        },
        fields: [
          {
            name: 'headline',
            type: 'text',
            label: 'Headline',
          },
          {
            name: 'description',
            type: 'text',
            label: 'Description',
          },
          {
            name: 'buttons',
            type: 'array',
            fields: [
              {
                name: 'label',
                type: 'text',
                required: true,
              },
              LinkField,
              {
                name: 'style',
                type: 'select',
                admin: {
                  description: 'Select the style for this button.',
                },
                options: [
                  {
                    label: 'Default',
                    value: 'default',
                  },
                  {
                    label: 'Secondary',
                    value: 'secondary',
                  },
                  {
                    label: 'Outline',
                    value: 'outline',
                  },
                  {
                    label: 'Link',
                    value: 'link',
                  },
                  {
                    label: 'Ghost',
                    value: 'ghost',
                  },
                ],
                defaultValue: 'default',
                required: true,
              },
            ],
          },
        ],
        interfaceName: 'CTABlock',
      },
      {
        slug: 'Team',
        labels: {
          singular: 'Team',
          plural: 'Teams',
        },
        fields: [
          {
            name: 'headline',
            type: 'text',
            label: 'Headline',
          },
          {
            name: 'members',
            type: 'array',
            label: 'Members',
            fields: [
              {
                name: 'name',
                type: 'text',
                label: 'Name',
              },
              {
                name: 'role',
                type: 'text',
                label: 'Role',
              },
              {
                name: 'photo',
                type: 'upload',
                label: 'Photo',
                relationTo: 'media',
              },
            ],
          },
        ],
        interfaceName: 'TeamBlock',
      },
      {
        slug: 'Stats',
        labels: {
          singular: 'Stats',
          plural: 'Stats',
        },
        fields: [
          {
            name: 'headline',
            type: 'text',
            label: 'Headline',
          },
          {
            name: 'description',
            type: 'text',
            label: 'Description',
          },
          {
            name: 'stats',
            type: 'array',
            label: 'Stats',
            fields: [
              {
                name: 'value',
                type: 'text',
                label: 'Value',
                required: true,
              },
              {
                name: 'label',
                type: 'text',
                label: 'Label',
                required: true,
              },
            ],
          },
        ],
        interfaceName: 'StatsBlock',
      },
      {
        slug: 'Logos',
        labels: {
          singular: 'Logos',
          plural: 'Logos',
        },
        fields: [
          {
            name: 'headline',
            type: 'text',
            label: 'Headline',
          },
          {
            name: 'logos',
            type: 'array',
            label: 'Logos',
            fields: [
              {
                name: 'name',
                type: 'text',
                label: 'Name',
              },
              {
                name: 'image',
                type: 'upload',
                label: 'Image',
                relationTo: 'media',
                required: true,
              },
              LinkField,
            ],
          },
        ],
        interfaceName: 'LogosBlock',
      },
    ],
  },
  email: resendAdapter({
    apiKey: process.env.RESEND_API_KEY || '',
    defaultFromAddress: 'mail@ryanmearns.com',
    defaultFromName: 'Ryan Mearns',
    render: renderEmailTemplate,
    webhookSecret: process.env.RESEND_WEBHOOK_SECRET || '',
  }),
})
