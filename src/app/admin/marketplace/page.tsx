import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function AdminMarketplacePage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Marketplace Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            A table of all marketplace products and orders with management actions will be displayed here soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
