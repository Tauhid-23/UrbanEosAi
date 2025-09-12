import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Sprout } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
       <Sprout className="h-8 w-8 text-primary" />
      <span className="text-2xl font-bold tracking-tight">
        UrbanEos AI
      </span>
    </Link>
  );
}
