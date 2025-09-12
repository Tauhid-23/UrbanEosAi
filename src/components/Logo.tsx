import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
       <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.6667 4H13.3333V10.6667L18.6667 16V4Z" fill="hsl(var(--primary))" fillOpacity="0.5"/>
        <path d="M13.3333 28H18.6667V21.3333L13.3333 16V28Z" fill="hsl(var(--primary))"/>
        </svg>
      <span className="text-2xl font-bold tracking-tight">
        UrbanEos AI
      </span>
    </Link>
  );
}
