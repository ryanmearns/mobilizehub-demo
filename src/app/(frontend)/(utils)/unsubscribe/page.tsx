'use client'

import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { confirmUnsubscribe } from '@mobilizehub/payload-plugin/react'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { use, useState } from 'react'

export default function NextPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const params = use(searchParams)
  const token = params.token
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleUnsubscribe = async () => {
    if (!token) {
      setStatus('error')
      return
    }

    setStatus('loading')

    try {
      await confirmUnsubscribe({ token })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const renderContent = () => {
    if (!token) {
      return (
        <>
          <h2 className="text-primary text-4xl font-bold">Invalid Link</h2>
          <p className="text-foreground mt-5 text-base">
            This unsubscribe link is invalid. Please check the link in your email and try again.
          </p>
        </>
      )
    }

    if (status === 'success') {
      return (
        <>
          <h2 className="text-primary text-4xl font-bold">Unsubscribed</h2>
          <p className="text-foreground mt-5 text-base">
            You&apos;ve been removed from our mailing list. You won&apos;t receive any more emails
            from us.
          </p>
        </>
      )
    }

    if (status === 'error') {
      return (
        <>
          <h2 className="text-primary text-4xl font-bold">Unsubscribe Failed</h2>
          <p className="text-foreground mt-5 text-base">
            We couldn&apos;t process your request. The link may have expired or already been used.
          </p>
        </>
      )
    }

    return (
      <>
        <h2 className="text-primary text-4xl font-bold">Do you want to unsubscribe?</h2>
        <p className="text-foreground mt-5 mb-6 text-base">
          Click the button below to unsubscribe from our mailing list.
        </p>
        <Button size="lg" onClick={handleUnsubscribe} disabled={status === 'loading'}>
          {status === 'loading' && (
            <>
              <Loader2 className="size-4 animate-spin" /> Unsubscribing
            </>
          )}
          {status !== 'loading' && 'Unsubscribe from all emails'}
        </Button>
      </>
    )
  }

  return (
    <div className="flex min-h-dvh flex-col items-center px-4">
      <div className="flex max-w-2xl flex-1 flex-col items-center justify-center text-center">
        {renderContent()}
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
