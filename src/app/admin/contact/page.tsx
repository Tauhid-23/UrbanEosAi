
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function AdminContactPage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Contact Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            A list of all user-submitted contact messages will be displayed here soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
