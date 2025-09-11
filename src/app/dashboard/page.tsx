import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RecommendationTool } from './components/RecommendationTool';
import { HealthTracker } from './components/HealthTracker';
import PlantCard from './components/PlantCard';
import { userPlants } from '@/lib/data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard | Verdant Vista',
    description: 'Manage your plants, track their health, and get AI recommendations.',
};

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline">Welcome back!</h1>
        <p className="text-muted-foreground mt-2">Here's what's happening with your urban garden today.</p>
      </header>

      <Tabs defaultValue="my-plants" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
          <TabsTrigger value="my-plants">My Plants</TabsTrigger>
          <TabsTrigger value="health-tracker">Health Tracker</TabsTrigger>
          <TabsTrigger value="ai-recommend">AI Helper</TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-plants" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {userPlants.map(plant => (
                    <PlantCard key={plant.id} plant={plant} />
                ))}
            </div>
        </TabsContent>

        <TabsContent value="health-tracker" className="mt-6">
            <HealthTracker />
        </TabsContent>

        <TabsContent value="ai-recommend" className="mt-6">
            <RecommendationTool />
        </TabsContent>
      </Tabs>
    </div>
  );
}
