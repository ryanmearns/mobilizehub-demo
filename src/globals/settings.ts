import { LinkField } from '@/fields/link'
import { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  fields: [
    {
      type: 'collapsible',
      label: 'Header',
      fields: [
        {
          name: 'navItems',
          label: 'Navigation',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            LinkField,
          ],
        },
        {
          name: 'navButtons',
          label: 'Buttons',
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
    },
    {
      type: 'collapsible',
      label: 'Footer',
      fields: [
        {
          name: 'footerItems',
          label: 'Navigation',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            LinkField,
          ],
        },
      ],
    },
  ],
}
