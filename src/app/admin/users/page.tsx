import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function AdminUsersPage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            A table of all registered users with management actions (edit role, suspend, delete) will be displayed here soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
