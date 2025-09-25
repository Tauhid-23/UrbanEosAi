
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { collection, getCountFromServer, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import type { ContactMessage } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { Users, Sprout, ShoppingBasket, Newspaper } from 'lucide-react';

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

  const stats = [
    { title: 'Total Users', count: userCount, icon: <Users className="h-6 w-6 text-muted-foreground" /> },
    { title: 'Total Plants', count: plantCount, icon: <Sprout className="h-6 w-6 text-muted-foreground" /> },
    { title: 'Total Orders', count: orderCount, icon: <ShoppingBasket className="h-6 w-6 text-muted-foreground" /> },
    { title: 'Blog Posts', count: blogPostCount, icon: <Newspaper className="h-6 w-6 text-muted-foreground" /> },
  ]


  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map(stat => (
            <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    {stat.icon}
                </CardHeader>
                <CardContent>
                    {loading ? <Skeleton className="h-8 w-1/2" /> : <p className="text-2xl font-bold">{stat.count}</p>}
                </CardContent>
            </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  <li key={msg.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <p className="font-semibold">{msg.name} <span className="text-sm text-muted-foreground">({msg.email})</span></p>
                      <p className="text-sm text-muted-foreground truncate">{msg.message}</p>
                    </div>
                    <p className="text-xs text-muted-foreground whitespace-nowrap self-end sm:self-center">
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
    </div>
  );
}

    