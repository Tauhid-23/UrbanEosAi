
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import BlogPostsTable from './components/BlogPostsTable';
import CreateBlogPostForm from '../components/CreateBlogPostForm';

export default function AdminBlogPage() {
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);

  return (
    <>
      <div>
        <Card>
          <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <CardTitle>Blog Management</CardTitle>
              <CardDescription>
                A table of all blog posts with management actions.
              </CardDescription>
            </div>
            <Button onClick={() => setCreateDialogOpen(true)} className="w-full md:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </CardHeader>
          <CardContent>
            <BlogPostsTable />
          </CardContent>
        </Card>
      </div>

      <Dialog open={isCreateDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Blog Post</DialogTitle>
            <DialogDescription>
              Write and publish a new article for your blog.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 overflow-y-auto max-h-[70vh]">
            <CreateBlogPostForm />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

    
