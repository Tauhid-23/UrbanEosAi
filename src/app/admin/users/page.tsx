import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import UserTable from './components/UserTable';

export default function AdminUsersPage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
           <CardDescription>
            A table of all registered users with management actions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserTable />
        </CardContent>
      </Card>
    </div>
  );
}
