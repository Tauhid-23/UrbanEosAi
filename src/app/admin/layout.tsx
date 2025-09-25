
import type { Metadata } from 'next';
import AdminDashboardLayout from './components/AdminDashboardLayout';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Verdant Vista',
  description: 'Manage your application content and users.',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminDashboardLayout>{children}</AdminDashboardLayout>;
}
