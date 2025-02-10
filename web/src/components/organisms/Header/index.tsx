'use client'

import { Button } from '@/components/atoms/Button'
import { ThemeToggle } from '@/components/molecules/ThemeToggle'
import { Brain, Home, Search } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Explore', href: '/explore', icon: Search },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Brain className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">
            Remmy
          </span>
        </Link>
        <nav className="flex flex-1 items-center space-x-1">
          {navigation.map(({ name, href, icon: Icon }) => (
            <Link key={name} href={href}>
              <Button
                variant={pathname === href ? 'secondary' : 'ghost'}
                className="gap-2"
              >
                <Icon className="h-4 w-4" />
                {name}
              </Button>
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
