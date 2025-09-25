import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function AdminAuditPage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Audit Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            A table of all administrator actions will be displayed here soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
