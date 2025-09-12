import Link from 'next/link';
import { Logo } from '../Logo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: '#' },
    { icon: <Twitter className="h-5 w-5" />, href: '#' },
    { icon: <Instagram className="h-5 w-5" />, href: '#' },
    { icon: <Linkedin className="h-5 w-5" />, href: '#' },
  ];

  const footerLinks = {
    Company: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '#' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
    Product: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#' },
      { label: 'Resources', href: '/resources' },
      { label: 'Marketplace', href: '/marketplace' },
    ],
    Support: [
      { label: 'Help Center', href: '#' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
    ]
  };

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-4">
            <Logo />
            <p className="text-muted-foreground max-w-md">
              Make Urban Gardening Simple with AI Guidance. Transform your space into a lush, thriving garden.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Link href={social.href} key={index} className="text-muted-foreground hover:text-primary">
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        <div className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex-1 w-full md:w-auto">
                <h4 className="font-bold mb-2">Stay Updated</h4>
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input type="email" placeholder="Your email address" />
                    <Button type="submit">Subscribe</Button>
                </div>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-right">
                &copy; {currentYear} UrbanEos AI. All rights reserved.
            </p>
        </div>
      </div>
    </footer>
  );
}
