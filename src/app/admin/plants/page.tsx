import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function AdminPlantsPage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Plant Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            A table of all user plants with management actions will be displayed here soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
