
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import CreateBlogPostForm from './components/CreateBlogPostForm';
import CreateProductForm from './components/CreateProductForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import { collection, getCountFromServer, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import type { ContactMessage } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

export default function AdminDashboardPage() {
  const [userCount, setUserCount] = useState(0);
  const [plantCount, setPlantCount] =useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [blogPostCount, setBlogPostCount] = useState(0);
  const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true);
      try {
        const usersCol = collection(db, 'users');
        const plantsCol = collection(db, 'plants');
        const ordersCol = collection(db, 'orders');
        const blogPostsCol = collection(db, 'blogPosts');
        const messagesQuery = query(collection(db, 'contactMessages'), orderBy('createdAt', 'desc'), limit(5));

        const [
          usersSnapshot,
          plantsSnapshot,
          ordersSnapshot,
          blogPostsSnapshot,
          messagesSnapshot,
        ] = await Promise.all([
          getCountFromServer(usersCol),
          getCountFromServer(plantsCol),
          getCountFromServer(ordersCol),
          getCountFromServer(blogPostsCol),
          getDocs(messagesQuery),
        ]);

        setUserCount(usersSnapshot.data().count);
        setPlantCount(plantsSnapshot.data().count);
        setOrderCount(ordersSnapshot.data().count);
        setBlogPostCount(blogPostsSnapshot.data().count);
        
        const messages = messagesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(),
        })) as ContactMessage[];
        setRecentMessages(messages);

      } catch (error) {
        console.error("Error fetching admin dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);


  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="content">Content Management</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div className="grid gap-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Users</CardTitle>
                <CardDescription>All registered users</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? <Skeleton className="h-8 w-1/2" /> : <p className="text-3xl font-bold">{userCount}</p>}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Plants</CardTitle>
                <CardDescription>All user-tracked plants</CardDescription>
              </CardHeader>
              <CardContent>
                 {loading ? <Skeleton className="h-8 w-1/2" /> : <p className="text-3xl font-bold">{plantCount}</p>}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Orders</CardTitle>
                <CardDescription>All marketplace orders</CardDescription>
              </CardHeader>
              <CardContent>
                 {loading ? <Skeleton className="h-8 w-1/2" /> : <p className="text-3xl font-bold">{orderCount}</p>}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Blog Posts</CardTitle>
                <CardDescription>Published articles</CardDescription>
              </CardHeader>
              <CardContent>
                 {loading ? <Skeleton className="h-8 w-1/2" /> : <p className="text-3xl font-bold">{blogPostCount}</p>}
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Contact Messages</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                 <div className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
              ) : recentMessages.length > 0 ? (
                <ul className="space-y-4">
                  {recentMessages.map(msg => (
                    <li key={msg.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{msg.name} <span className="text-sm text-muted-foreground">({msg.email})</span></p>
                        <p className="text-sm text-muted-foreground truncate">{msg.message}</p>
                      </div>
                      <p className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDistanceToNow(msg.createdAt, { addSuffix: true })}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No messages yet.</p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Revenue chart will be displayed here.
              </p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="content">
        <div className="grid md:grid-cols-2 gap-8 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Blog Post</CardTitle>
              <CardDescription>
                Write and publish a new article for your blog.
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
                Add a new item to the marketplace.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CreateProductForm />
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}
