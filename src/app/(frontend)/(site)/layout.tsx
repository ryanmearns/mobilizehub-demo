import { getSettings } from '@/lib/get-settings'
import React from 'react'
import { Navbar } from '../../../components/navbar'
import { Footer } from '../../../components/footer'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings()

  return (
    <React.Fragment>
      <Navbar {...settings} />
      <main>{children}</main>
      <Footer />
    </React.Fragment>
  )
}
