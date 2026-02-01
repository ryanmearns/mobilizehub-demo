'use client'

import { Setting } from '@/payload-types'
import Link from 'next/link'
import React, { useState } from 'react'
import { Logo } from './logo'
import { PayloadLink } from './payload-link'
import { Button } from './ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from './ui/navigation-menu'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

export function Navbar(props: Setting) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  return (
    <header>
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4 py-5 sm:px-6 lg:px-8">
        <Link href="/">
          <div className="flex items-center gap-1.5">
            <Logo size={24} />
            <p className="font text-center text-xl font-extrabold uppercase font-stretch-condensed">
              Advocate
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {/* Mobile toggle */}
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={isMobileOpen}
            onClick={() => setIsMobileOpen((prev) => !prev)}
          >
            <span className="sr-only">Toggle navigation</span>

            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <NavigationMenu viewport={false} className="hidden font-semibold md:flex gap-2">
            <NavigationMenuList>
              {props.navItems?.map((item, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink asChild className="px-4">
                    <PayloadLink link={item.link}>{item.label}</PayloadLink>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>

            <NavigationMenuList>
              {props.navButtons?.map((button, index) => (
                <NavigationMenuItem key={index + (props.navItems?.length || 0)}>
                  <Button asChild variant={button.style}>
                    <PayloadLink link={button.link}>{button.label}</PayloadLink>
                  </Button>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>

      {isMobileOpen && (
        <div className="border-muted border-y bg-white shadow-sm md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex w-full flex-col justify-start gap-2">
              <div className="flex w-full flex-col items-stretch gap-1">
                {props.navItems?.map((item, index) => (
                  <Button asChild key={index} className="w-full" variant={'ghost'}>
                    <PayloadLink link={item.link}>{item.label}</PayloadLink>
                  </Button>
                ))}
              </div>

              <div className="flex w-full flex-col items-stretch gap-2">
                {props.navButtons?.map((button, index) => (
                  <Button
                    asChild
                    key={index + (props.navItems?.length || 0)}
                    className="w-full"
                    variant={button.style}
                  >
                    <PayloadLink link={button.link}>{button.label}</PayloadLink>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
