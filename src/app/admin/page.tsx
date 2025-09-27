
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import type { ContactMessage } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { Users, Sprout, ShoppingBasket, Newspaper } from 'lucide-react';

const staticMessages: ContactMessage[] = [
    {id: '1', name: 'Alice', email: 'alice@example.com', message: 'I have a question about my order.', createdAt: new Date(Date.now() - 1000 * 60 * 5), status: 'new'},
    {id: '2', name: 'Bob', email: 'bob@example.com', message: 'Great app! Just wanted to say thanks.', createdAt: new Date(Date.now() - 1000 * 60 * 60), status: 'new'},
    {id: '3', name: 'Charlie', email: 'charlie@example.com', message: 'My plant looks sick, can you help?', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), status: 'new'},
]


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
      // Simulate fetching data for demo
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUserCount(125);
      setPlantCount(340);
      setOrderCount(89);
      setBlogPostCount(12);
      setRecentMessages(staticMessages);

      setLoading(false);
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
