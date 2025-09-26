
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function AdminResourcesPage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Resource Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            A list of all gardening resources with management actions will be displayed here soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
