import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { resendAdapter } from '@payloadcms/email-resend'
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { migrations } from './migrations'
import { mobilizehub } from './mobilizehub.config'
import { seed } from './lib/seed'
import { Settings } from './globals/settings'
import { CONSTS } from './lib/consts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  globals: [Settings],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    prodMigrations: migrations,
  }),
  onInit: async (payload) => {
    if (process.env.NODE_ENV === 'development') {
      await seed(payload)
    }
  },
  sharp,
  jobs: {
    autoRun: [
      {
        cron: '* * * * *',
        queue: 'email-broadcasts',
      },
      {
        cron: '* * * * *',
        queue: 'email-send',
      },
    ],
  },
  email: resendAdapter({
    apiKey: process.env.RESEND_API_KEY || '',
    defaultFromAddress: CONSTS.defaultEmailAddress,
    defaultFromName: CONSTS.defaultFromName,
  }),
  plugins: [
    mobilizehub,
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION || '',
        endpoint: process.env.S3_ENDPOINT,
        forcePathStyle: true,
      },
    }),
  ],
})
