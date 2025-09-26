
'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Users,
  Sprout,
  ShoppingBasket,
  Newspaper,
  BookText,
  Mail,
  BarChart,
  History,
  Shield,
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import AdminHeader from './AdminHeader';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Loading from '@/app/loading';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/plants', label: 'Plants', icon: Sprout },
  { href: '/admin/marketplace', label: 'Marketplace', icon: ShoppingBasket },
  { href: '/admin/blog', label: 'Blog', icon: Newspaper },
  { href: '/admin/resources', label: 'Resources', icon: BookText },
  { href: '/admin/contact', label: 'Contact', icon: Mail },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart },
  { href: '/admin/audit', label: 'Audit Logs', icon: History },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else {
        // Once loading is false and user is present, check admin status
        setIsAuthorized(user.isAdmin);
      }
    }
  }, [user, loading, router]);


  if (loading || isAuthorized === null) {
    return <Loading />;
  }

  if (isAuthorized === false) {
    return (
       <div className="container mx-auto flex h-screen flex-col items-center justify-center p-4">
         <Card className="w-full max-w-md text-center">
            <CardHeader>
                <CardTitle className="text-2xl">Access Denied</CardTitle>
                <CardDescription>You do not have permission to view this page.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Please sign in with an administrator account to continue.</p>
                <Button onClick={() => router.push('/')} className="mt-4 w-full">Go to Homepage</Button>
            </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  as="a"
                  href={item.href}
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton as="a" href="/" tooltip="Exit Admin">
                        <Shield className="transform -scale-x-100" />
                        <span>Exit Admin</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
           </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <AdminHeader />
        <main className="p-4 md:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
