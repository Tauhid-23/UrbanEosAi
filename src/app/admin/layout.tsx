
import type { Metadata } from 'next';
import withAuth from '@/components/withAuth';
import AdminDashboardLayout from './components/AdminDashboardLayout';

export const metadata: Metadata = {
  title: 'Admin Dashboard | UrbanEos AI',
  description: 'Manage your application content and users.',
};

function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminDashboardLayout>{children}</AdminDashboardLayout>;
}

export default withAuth(AdminLayout);
