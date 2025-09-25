
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import withAuth from '@/components/withAuth';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  collection,
  getDocs,
  runTransaction,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { blogPosts, products } from '@/lib/data';
import CreateBlogPostForm from './components/CreateBlogPostForm';
import CreateProductForm from './components/CreateProductForm';

function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isSeeding, setIsSeeding] = useState(false);

  const seedDatabase = async () => {
    setIsSeeding(true);
    toast({
      title: 'Seeding Database...',
      description: 'This may take a moment.',
    });

    try {
      await runTransaction(db, async (transaction) => {
        const blogPostsCollection = collection(db, 'blogPosts');
        const blogSnapshot = await getDocs(blogPostsCollection);
        if (blogSnapshot.empty) {
          for (const post of blogPosts) {
            const newDocRef = doc(blogPostsCollection);
            transaction.set(newDocRef, {
              ...post,
              slug: post.title.toLowerCase().replace(/\s+/g, '-'),
              date: serverTimestamp(),
            });
          }
        }

        const productsCollection = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCollection);
        if (productsSnapshot.empty) {
          for (const product of products) {
            const newDocRef = doc(productsCollection);
            transaction.set(newDocRef, product);
          }
        }
      });

      toast({
        title: 'Database Seeded!',
        description:
          'Initial blog posts and products have been added to Firestore.',
      });
    } catch (error) {
      console.error('Error seeding database:', error);
      toast({
        variant: 'destructive',
        title: 'Seeding Failed',
        description: 'Could not seed the database. Check console for errors.',
      });
    } finally {
      setIsSeeding(false);
    }
  };

  if (!user || !user.isAdmin) {
    return (
      <div className="container mx-auto flex h-full flex-col items-center justify-center p-4">
         <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Access Denied</CardTitle>
                <CardDescription>You do not have permission to view this page.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Please contact an administrator if you believe this is a mistake.</p>
                <Button onClick={() => router.push('/')} className="mt-4 w-full">Go to Homepage</Button>
            </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your application's content here.
        </p>
      </header>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4 grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content Management</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
           <Card>
              <CardHeader>
                <CardTitle>Welcome, {user.displayName}!</CardTitle>
                <CardDescription>
                  Here's a quick look at your application's status.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Overview of users, plants, orders, and revenue will be displayed here in the next step.</p>
              </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="content">
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Create New Blog Post</CardTitle>
                <CardDescription>
                  Fill out the form to add a new article to your blog.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CreateBlogPostForm />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Create New Product</CardTitle>
                <CardDescription>
                  Add a new item to your marketplace.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CreateProductForm />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="database">
          <Card>
            <CardHeader>
              <CardTitle>Database Management</CardTitle>
              <CardDescription>
                Perform database actions like seeding initial data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Button onClick={seedDatabase} disabled={isSeeding}>
                  {isSeeding ? 'Seeding...' : 'Seed Initial Data'}
                </Button>
                <p className="text-sm text-muted-foreground">
                  Populate Firestore with initial blog posts and products. This
                  only runs if the collections are empty.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default withAuth(AdminPage);
