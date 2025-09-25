import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function AdminBlogPage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Blog Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            A list of all blog posts with management actions (create, edit, delete) will be displayed here soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
