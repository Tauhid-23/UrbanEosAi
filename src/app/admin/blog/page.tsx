import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import BlogPostsTable from './components/BlogPostsTable';

export default function AdminBlogPage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Blog Management</CardTitle>
          <CardDescription>
            A table of all blog posts with management actions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BlogPostsTable />
        </CardContent>
      </Card>
    </div>
  );
}
