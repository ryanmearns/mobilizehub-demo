import { BasePayload } from 'payload'
import type { Media } from '@/payload-types'
import { CONSTS } from './consts'

export async function seed(payload: BasePayload) {
  payload.logger.info('Starting seed process...')

  // Check if admin user already exists
  const existingUsers = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: CONSTS.defaultAdminEmail,
      },
    },
  })

  let adminUser
  if (existingUsers.docs.length === 0) {
    payload.logger.info('Creating admin user...')
    adminUser = await payload.create({
      collection: 'users',
      data: {
        email: CONSTS.defaultAdminEmail,
        password: CONSTS.defaultAdminPassword,
      },
    })
    payload.logger.info('Admin user created')
  } else {
    payload.logger.info('Admin user already exists, skipping...')
    adminUser = existingUsers.docs[0]
  }

  // Seed placeholder image
  const existingMedia = await payload.find({
    collection: 'media',
    where: {
      alt: {
        equals: 'Placeholder Image',
      },
    },
  })

  let placeholderImage: Media
  if (existingMedia.docs.length === 0) {
    payload.logger.info('Fetching and uploading placeholder image...')
    const imageUrl = 'https://ui.shadcn.com/placeholder.svg'
    const response = await fetch(imageUrl)

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`)
    }

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    placeholderImage = await payload.create({
      collection: 'media',
      data: {
        alt: 'Placeholder Image',
      },
      file: {
        data: buffer,
        mimetype: 'image/svg+xml',
        name: 'placeholder.svg',
        size: buffer.length,
      },
    })
    payload.logger.info('Placeholder image uploaded')
  } else {
    payload.logger.info('Placeholder image already exists, skipping...')
    placeholderImage = existingMedia.docs[0]
  }

  // Seed join form (before about page and home page since they reference it)
  const existingForms = await payload.find({
    collection: 'forms',
    where: {
      slug: {
        equals: 'join',
      },
    },
  })

  let joinForm
  if (existingForms.docs.length === 0) {
    payload.logger.info('Creating join form...')
    joinForm = await payload.create({
      collection: 'forms',
      draft: false,
      data: {
        name: 'Join',
        status: 'published',
        slug: 'join',
        headline: 'Join Us',
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    mode: 'normal',
                    text: 'Advocate exists to stand up for people, ideas, and causes that matter. We work alongside individuals and communities to amplify voices, create meaningful change, and ensure that everyone has the opportunity to be heard and represented.',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: null,
                textStyle: '',
                textFormat: 0,
              },
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    mode: 'normal',
                    text: 'Driven by integrity, empathy, and impact, Advocate combines expertise with action—whether that means providing guidance, influencing decisions, or supporting long-term solutions. We believe advocacy is most powerful when it is informed, inclusive, and focused on real outcomes.',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: null,
                textStyle: '',
                textFormat: 0,
              },
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    mode: 'normal',
                    text: "At Advocate, we don't just speak up. We listen, collaborate, and act—because progress happens when people have a strong advocate on their side.",
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: null,
                textStyle: '',
                textFormat: 0,
              },
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    mode: 'normal',
                    text: 'Sign up to recieve updates on our work.',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: null,
                textStyle: '',
                textFormat: 0,
              },
            ],
            direction: null,
          },
        },
        legend: 'Sign up to get involved',
        contactFields: [
          {
            id: '696d5f9faa7535a608c9adde',
            label: 'Email',
            required: true,
            blockName: null,
            blockType: 'email',
          },
          {
            id: '696d5f9faa7535a608c9addf',
            label: 'First Name',
            required: false,
            blockName: null,
            blockType: 'firstName',
          },
          {
            id: '696d5f9faa7535a608c9ade0',
            label: 'Last Name',
            required: false,
            blockName: null,
            blockType: 'lastName',
          },
        ],
        submitButtonLabel: null,
        confirmationType: 'message',
        confirmationMessage: null,
        type: 'reference',
        url: null,
        tags: [],
        autoresponse: {
          enabled: false,
          fromName: CONSTS.defaultFromName,
          fromAddress: CONSTS.defaultEmailAddress,
          replyTo: null,
          subject: null,
          previewText: null,
          content: null,
        },
      },
    })
    payload.logger.info('Join form created')
  } else {
    payload.logger.info('Join form already exists, skipping...')
    joinForm = existingForms.docs[0]
  }

  // Seed about page (after join form since it references it)
  const existingAboutPage = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'about',
      },
    },
  })

  let aboutPage
  if (existingAboutPage.docs.length === 0) {
    payload.logger.info('Creating about page...')
    aboutPage = await payload.create({
      collection: 'pages',
      data: {
        name: 'About',
        status: 'published',
        slug: 'about',
        blocks: [
          {
            id: '6976b04404b728528da214b8',
            headline: 'About us',
            blockName: null,
            blockType: 'Header',
          },
          {
            id: '6976b04c04b728528da214b9',
            richText: {
              root: {
                type: 'root',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    type: 'paragraph',
                    format: '',
                    indent: 0,
                    version: 1,
                    children: [
                      {
                        mode: 'normal',
                        text: 'Advocate exists to stand up for people, ideas, and causes that matter. We work alongside individuals and communities to amplify voices, create meaningful change, and ensure that everyone has the opportunity to be heard and represented.',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: null,
                    textStyle: '',
                    textFormat: 0,
                  },
                  {
                    type: 'paragraph',
                    format: '',
                    indent: 0,
                    version: 1,
                    children: [
                      {
                        mode: 'normal',
                        text: 'Driven by integrity, empathy, and impact, Advocate combines expertise with action—whether that means providing guidance, influencing decisions, or supporting long-term solutions. We believe advocacy is most powerful when it is informed, inclusive, and focused on real outcomes.',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: null,
                    textStyle: '',
                    textFormat: 0,
                  },
                  {
                    type: 'paragraph',
                    format: '',
                    indent: 0,
                    version: 1,
                    children: [
                      {
                        mode: 'normal',
                        text: "At Advocate, we don't just speak up. We listen, collaborate, and act—because progress happens when people have a strong advocate on their side.",
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: null,
                    textStyle: '',
                    textFormat: 0,
                  },
                ],
                direction: null,
              },
            },
            blockName: null,
            blockType: 'content',
          },
          {
            id: '6976b0b604b728528da214bc',
            headline: 'Our team',
            blockName: null,
            members: [
              {
                id: '6976b0c404b728528da214bd',
                name: 'Leslie Alexander',
                role: 'CEO',
                photo: placeholderImage.id,
              },
              {
                id: '6976b0d204b728528da214be',
                name: 'Michael Foster',
                role: 'CTO',
                photo: placeholderImage.id,
              },
              {
                id: '6976b0de04b728528da214bf',
                name: 'Dries Vincent',
                role: 'COO',
                photo: placeholderImage.id,
              },
              {
                id: '6976b11004b728528da214c2',
                name: 'Tom Cook',
                role: 'CFO',
                photo: placeholderImage.id,
              },
              {
                id: '6976b0e804b728528da214c0',
                name: 'Lindsay Walton',
                role: 'Director of Community Organizing',
                photo: placeholderImage.id,
              },
              {
                id: '6976b0fb04b728528da214c1',
                name: 'Courtney Henry',
                role: 'Director of Digital Organizing',
                photo: placeholderImage.id,
              },
            ],
            blockType: 'Team',
          },
          {
            id: '6976b13b04b728528da214c3',
            headline: 'Be Part of the Change',
            description:
              'Join us in amplifying voices and shaping better outcomes for people and communities.',
            blockName: null,
            buttons: [
              {
                id: '6976b14b04b728528da214c4',
                label: 'Signup',
                style: 'default',
                link: {
                  type: 'reference',
                  page: {
                    relationTo: 'forms',
                    value: joinForm?.id ?? 1,
                  },
                  url: null,
                  openInNewTab: false,
                },
              },
            ],
            blockType: 'CTA',
          },
        ],
      },
    })
    payload.logger.info('About page created')
  } else {
    payload.logger.info('About page already exists, skipping...')
    aboutPage = existingAboutPage.docs[0]
  }

  // Seed home page (after about page and join form since it references them)
  const existingPages = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
      },
    },
  })

  if (existingPages.docs.length === 0) {
    payload.logger.info('Creating home page...')
    await payload.create({
      collection: 'pages',
      data: {
        name: 'Home',
        status: 'published',
        slug: 'home',
        blocks: [
          {
            id: '69615d5d4d918c21ce8fbf02',
            headline: 'Because Every Voice Matters',
            subheadline:
              'Advocate works to ensure people are heard, supported, and represented when it matters most.',
            image: placeholderImage.id,
            blockName: null,
            buttons: [
              {
                id: '6976b02804b728528da214b7',
                label: 'Signup',
                style: 'default',
                link: {
                  type: 'reference',
                  page: {
                    relationTo: 'pages',
                    value: joinForm?.id ?? 1,
                  },
                  url: null,
                  openInNewTab: false,
                },
              },
              {
                id: '6976b06b04b728528da214ba',
                label: 'Learn more →',
                style: 'link',
                link: {
                  type: 'reference',
                  page: {
                    relationTo: 'pages',
                    value: aboutPage?.id ?? 2,
                  },
                  url: null,
                  openInNewTab: false,
                },
              },
            ],
            blockType: 'Hero',
          },
          {
            id: '6976b41caae9b6364a46f6c3',
            headline: 'Trusted by Leading Organisations',
            blockName: null,
            logos: [
              {
                id: '6976b434aae9b6364a46f6c5',
                name: '#1',
                image: placeholderImage.id,
                link: {
                  type: 'custom',
                  url: 'https://www.example.com',
                  openInNewTab: false,
                },
              },
              {
                id: '6976b44aaae9b6364a46f6c6',
                name: '#2',
                image: placeholderImage.id,
                link: {
                  type: 'custom',
                  url: 'https://www.example.com',
                  openInNewTab: false,
                },
              },
              {
                id: '6976b44daae9b6364a46f6c7',
                name: '#3',
                image: placeholderImage.id,
                link: {
                  type: 'custom',
                  url: 'https://www.example.com',
                  openInNewTab: false,
                },
              },
              {
                id: '6976b963fcab92858d4e42b0',
                name: '#4',
                image: placeholderImage.id,
                link: {
                  type: 'custom',
                  url: 'https://www.example.com',
                  openInNewTab: false,
                },
              },
            ],
            blockType: 'Logos',
          },
          {
            id: '6976afdc04b728528da214b3',
            image: placeholderImage.id,
            caption: 'A placeholder image',
            blockName: null,
            blockType: 'Image',
          },
          {
            id: '6976af9204b728528da214af',
            headline: 'What we stand for',
            blockName: null,
            items: [
              {
                id: '6976af9604b728528da214b0',
                title: 'Integrity',
                description:
                  'We act with honesty, transparency, and accountability in everything we do. Trust is the foundation of effective advocacy, and we work hard to earn it every day.',
                image: placeholderImage.id,
                link: {
                  type: 'reference',
                  page: {
                    relationTo: 'pages',
                    value: joinForm?.id ?? 1,
                  },
                  url: null,
                  openInNewTab: false,
                },
              },
              {
                id: '6976afb204b728528da214b1',
                title: 'Empathy',
                description:
                  'We listen first. By understanding lived experiences and diverse perspectives, we ensure our work is human-centred, respectful, and genuinely impactful.',
                image: placeholderImage.id,
                link: {
                  type: 'reference',
                  page: {
                    relationTo: 'pages',
                    value: joinForm?.id ?? 1,
                  },
                  url: null,
                  openInNewTab: false,
                },
              },
              {
                id: '6976afc704b728528da214b2',
                title: 'Impact',
                description:
                  'We focus on outcomes, not noise. Every action we take is intentional, evidence-based, and aimed at creating real, lasting change.',
                image: placeholderImage.id,
                link: {
                  type: 'reference',
                  page: {
                    relationTo: 'pages',
                    value: joinForm?.id ?? 1,
                  },
                  url: null,
                  openInNewTab: false,
                },
              },
            ],
            blockType: 'Grid',
          },
          {
            id: '6976b97efcab92858d4e42b1',
            image: placeholderImage.id,
            caption: 'A placeholder image',
            blockName: null,
            blockType: 'Image',
          },
          {
            id: '6976b3d4aae9b6364a46f6bf',
            headline: 'Our Impact in Action',
            description: 'Measurable results that reflect our commitment to meaningful advocacy.',
            blockName: null,
            stats: [
              {
                id: '6976b3f6aae9b6364a46f6c0',
                value: '1,000+',
                label: 'People supported',
              },
              {
                id: '6976b3faaae9b6364a46f6c1',
                value: '50+',
                label: 'Organisations partnered with',
              },
              {
                id: '6976b3fbaae9b6364a46f6c2',
                value: '10+ Years',
                label: 'Driving people-centred change',
              },
            ],
            blockType: 'Stats',
          },
          {
            id: '6976afe904b728528da214b4',
            headline: 'Be Part of the Change',
            description:
              'Join us in amplifying voices and shaping better outcomes for people and communities.',
            blockName: null,
            buttons: [
              {
                id: '6976b01b04b728528da214b6',
                label: 'Sign up',
                style: 'default',
                link: {
                  type: 'reference',
                  page: {
                    relationTo: 'forms',
                    value: joinForm?.id ?? 1,
                  },
                  url: null,
                  openInNewTab: false,
                },
              },
            ],
            blockType: 'CTA',
          },
        ],
      },
    })
    payload.logger.info('Home page created')
  } else {
    payload.logger.info('Home page already exists, skipping...')
  }

  // Seed settings
  payload.logger.info('Creating settings...')
  await payload.updateGlobal({
    slug: 'settings',
    data: {
      navItems: [
        {
          label: 'About',
          link: {
            type: 'reference',
            page: {
              relationTo: 'pages',
              value: aboutPage?.id,
            },
            url: null,
            openInNewTab: false,
          },
        },
      ],
      navButtons: [
        {
          label: 'Join',
          link: {
            type: 'reference',
            page: {
              relationTo: 'forms',
              value: joinForm?.id,
            },
            url: null,
            openInNewTab: false,
          },
          style: 'default',
        },
      ],
      footerItems: [
        {
          label: 'About',
          link: {
            type: 'reference',
            page: {
              relationTo: 'pages',
              value: aboutPage?.id,
            },
            url: null,
            openInNewTab: false,
          },
        },
        {
          label: 'Join',
          link: {
            type: 'reference',
            page: {
              relationTo: 'forms',
              value: joinForm?.id,
            },
            url: null,
            openInNewTab: false,
          },
        },
      ],
    },
  })
  payload.logger.info('Settings created')

  payload.logger.info('Seed process completed!')
}
