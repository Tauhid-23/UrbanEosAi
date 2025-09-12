import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/Logo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sign Up | UrbanEos AI',
    description: 'Create a new account with UrbanEos AI.',
};

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen-minus-header bg-secondary/50 py-12 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className='flex justify-center mb-4'>
              <Logo />
          </div>
          <CardTitle className="font-headline">Create an Account</CardTitle>
          <CardDescription>Join our community and start your gardening journey.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full">Get Started</Button>
           <p className="text-xs text-center text-muted-foreground">
            By signing up, you agree to our{' '}
            <Link href="/terms" className="underline hover:text-primary">
              Terms of Service
            </Link>.
          </p>
          <p className="text-xs text-center text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="underline hover:text-primary">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
