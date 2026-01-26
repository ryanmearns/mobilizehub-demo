import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center px-4">
      <div className="flex max-w-2xl flex-1 flex-col items-center justify-center text-center">
        <h2 className="text-primary mt-4 text-4xl font-bold">Page not found</h2>
        <p className="text-foreground mt-5 mb-6 text-pretty">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. Please check the URL or
          navigate back home.
        </p>
        <Button asChild size={'lg'}>
          <Link href="/">
            Go to Homepage <ArrowRight />
          </Link>
        </Button>
      </div>
      <div className="pb-8">
        <Link href="/">
          <div className="flex items-center gap-1">
            <Logo size={20} />
            <p className="font text-center text-base font-extrabold uppercase font-stretch-condensed">
              Advocate
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}
