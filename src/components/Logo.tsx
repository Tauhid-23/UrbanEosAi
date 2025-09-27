import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <Image src="https://i.imgur.com/asgGaWa.png" alt="UrbanEos AI Logo" width={32} height={32} />
      <span className="text-2xl font-bold tracking-tight">
        UrbanEos AI
      </span>
    </Link>
  );
}
