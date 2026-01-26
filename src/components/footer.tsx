import { CONSTS } from '@/lib/consts'
import { getSettings } from '@/lib/get-settings'
import Link from 'next/link'
import { Logo } from './logo'
import { PayloadLink } from './payload-link'
import { Button } from './ui/button'

export async function Footer() {
  const settings = await getSettings()
  return (
    <footer>
      <div className="mx-auto w-full max-w-7xl py-6">
        <div className="flex w-full flex-col items-center justify-between gap-6 px-4 py-6 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <div>
              <Link href="/">
                <div className="flex items-center gap-1.5">
                  <Logo size={32} />
                </div>
              </Link>
            </div>

            <div className="flex flex-col items-center gap-2 sm:flex-row">
              {settings.footerItems?.map((item, index) => (
                <Button key={index} asChild variant={'link'}>
                  <PayloadLink link={item.link}>{item.label}</PayloadLink>
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between sm:flex-row">
            <p className="text-secondary-foreground text-center text-sm sm:text-left">
              &copy; {new Date().getFullYear()} {CONSTS.siteName}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
