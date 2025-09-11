import Link from 'next/link';
import { Logo } from '../Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Logo />
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link href="/about" className="hover:text-primary">About</Link>
            <Link href="/contact" className="hover:text-primary">Contact</Link>
            <Link href="/resources" className="hover:text-primary">Resources</Link>
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
          </nav>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Verdant Vista. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
