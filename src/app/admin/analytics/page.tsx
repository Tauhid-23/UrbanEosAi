
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function AdminAnalyticsPage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Analytics charts and reports will be displayed here soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
