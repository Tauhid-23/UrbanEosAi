'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ShoppingCart } from 'lucide-react';
import { Logo } from '../Logo';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/blog', label: 'Blog' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/resources', label: 'Resources' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();

  const NavLink = ({ href, label, isMobile = false }: { href: string; label: string, isMobile?: boolean }) => (
    <Link
      href={href}
      className={cn(
        'font-medium transition-colors hover:text-primary',
        pathname === href ? 'text-primary' : 'text-muted-foreground',
        isMobile ? 'text-lg' : 'text-sm'
      )}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center">
        <div className="mr-8 hidden md:flex">
          <Logo />
        </div>

        <div className="flex items-center md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="p-4">
                  <Logo />
                  <nav className="mt-8 flex flex-col gap-6">
                    {navLinks.map((link) => (
                      <NavLink key={link.href} {...link} isMobile />
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
        </div>
        
        <div className="flex flex-1 items-center justify-center md:justify-start">
            <div className="md:hidden">
              <Logo />
            </div>
            <nav className="hidden md:flex items-center space-x-6">
                {navLinks.map((link) => (
                <NavLink key={link.href} {...link} />
                ))}
            </nav>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/checkout">
              <ShoppingCart />
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
        </div>
      </div>
    </header>
  );
}
