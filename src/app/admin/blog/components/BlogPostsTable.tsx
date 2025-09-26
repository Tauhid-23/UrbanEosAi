
'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { Button } from '@/components/ui/button';
import { MoreHorizontal, Trash2, Edit } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import type { BlogPost } from '@/lib/types';
import { format } from 'date-fns';

export default function BlogPostsTable() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    const q = query(collection(db, 'blogPosts'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            // Convert Firestore Timestamp to a serializable format (ISO string)
            date: data.date.toDate ? data.date.toDate().toISOString() : data.date,
            ...data,
          } as BlogPost;
      })
      setPosts(postsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching blog posts:", error);
      toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to fetch blog posts.',
      });
      setLoading(false);
    });

    return () => unsubscribe();
  }, [toast]);

  const openDeleteDialog = (post: BlogPost) => {
    setPostToDelete(post);
    setIsDeleteDialogOpen(true);
  };

  const handleDeletePost = async () => {
    if (!postToDelete) return;

    try {
      await deleteDoc(doc(db, 'blogPosts', postToDelete.id));
      toast({
        title: 'Blog Post Deleted',
        description: `"${postToDelete.title}" has been successfully deleted.`,
      });
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete blog post.',
      });
    } finally {
        setIsDeleteDialogOpen(false);
        setPostToDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
           <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell>
                    <Badge variant="outline">{post.category}</Badge>
                </TableCell>
                 <TableCell>{format(new Date(post.date), 'PPP')}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => toast({ title: 'Edit Post (Coming Soon)', description: `This will allow editing ${post.title}.`})}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Post
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" onClick={() => openDeleteDialog(post)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Post
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
       <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the blog post <span className="font-bold">"{postToDelete?.title}"</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePost} className="bg-destructive hover:bg-destructive/90">
              Yes, delete post
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
