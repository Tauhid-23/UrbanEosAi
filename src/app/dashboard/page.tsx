import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Leaf,
  Plus,
  TrendingUp,
  ClipboardList,
  BarChart,
  Camera,
  Bot,
  Calendar,
  Settings,
  Target,
  Sprout,
  Grape,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | GreenAI',
  description:
    'Manage your plants, track their health, and get AI recommendations.',
};

const overviewItems = [
  {
    icon: <Leaf className="h-6 w-6 text-primary" />,
    title: 'Active Plants',
    value: '12',
    change: '+2 this week',
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-primary" />,
    title: 'Growth Rate',
    value: '94%',
    change: '+5% this month',
  },
  {
    icon: <ClipboardList className="h-6 w-6 text-primary" />,
    title: 'Harvest Ready',
    value: '3',
    change: 'Tomatoes & Herbs',
  },
  {
    icon: <BarChart className="h-6 w-6 text-primary" />,
    title: 'Health Score',
    value: 'Excellent',
    change: 'All systems green',
  },
];

const plantGrowth = [
  {
    icon: <Sprout className="h-8 w-8 text-primary" />,
    name: 'Cherry Tomatoes',
    stage: 'Flowering',
    progress: 75,
    days: '45 days',
  },
  {
    icon: <Sprout className="h-8 w-8 text-primary" />,
    name: 'Basil',
    stage: 'Mature',
    progress: 90,
    days: '60 days',
  },
  {
    icon: <Sprout className="h-8 w-8 text-primary" />,
    name: 'Bell Peppers',
    stage: 'Growing',
    progress: 50,
    days: '30 days',
  },
  {
    icon: <Sprout className="h-8 w-8 text-primary" />,
    name: 'Lettuce',
    stage: 'Seedling',
    progress: 25,
    days: '14 days',
  },
];

const aiRecommendations = [
  { text: 'Water your tomatoes', subtext: 'Soil moisture is getting low', color: 'bg-blue-100 dark:bg-blue-900/30 border-blue-400' },
  { text: 'Harvest basil leaves', subtext: 'Perfect time for maximum flavor', color: 'bg-green-100 dark:bg-green-900/30 border-green-400' },
  { text: 'Add fertilizer to peppers', subtext: 'Boost growth with organic nutrients', color: 'bg-orange-100 dark:bg-orange-900/30 border-orange-400' },
];

const quickActions = [
    { icon: <Calendar className="h-5 w-5" />, text: 'Schedule Watering' },
    { icon: <BarChart className="h-5 w-5" />, text: 'View Analytics' },
    { icon: <Settings className="h-5 w-5" />, text: 'Garden Settings' },
]

const goals = [
    { name: 'Plants Added', progress: 66, value: '2/3' },
    { name: 'Harvests', progress: 62.5, value: '5/8' },
    { name: 'Care Sessions', progress: 80, value: '12/15' },
]

export default function DashboardPage() {
  return (
    <div className="bg-secondary/30 min-h-screen-minus-header p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-headline">
            Welcome back, <span className="text-primary">Sarah!</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Your urban garden is thriving. Here's your progress overview.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {overviewItems.map((item) => (
            <Card key={item.title}>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">{item.icon}</div>
                <div>
                  <p className="text-sm text-muted-foreground">{item.title}</p>
                  <p className="text-2xl font-bold">{item.value}</p>
                  <p className="text-xs text-muted-foreground">{item.change}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="font-headline">
                    Plant Growth Tracker
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Monitor your plants' development
                  </p>
                </div>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" /> Add Plant
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {plantGrowth.map((plant) => (
                    <div
                      key={plant.name}
                      className="bg-secondary/50 p-4 rounded-lg flex items-center gap-4"
                    >
                      <div className="bg-background p-2 rounded-full">{plant.icon}</div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-baseline mb-1">
                          <p className="font-semibold">{plant.name} <span className="text-xs text-muted-foreground font-normal">({plant.stage})</span></p>
                          <p className="text-xs text-muted-foreground">{plant.days}</p>
                        </div>
                        <Progress value={plant.progress} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <Camera className="h-6 w-6 text-primary" /> AI Disease
                  Detection
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Scan your plants for health issues
                </p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="bg-secondary/50 p-8 rounded-lg flex flex-col items-center">
                  <Camera className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold">Scan a Plant</h3>
                  <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
                    Take a photo to instantly identify diseases and get treatment
                    recommendations
                  </p>
                  <Button>
                    <Camera className="mr-2 h-4 w-4" /> Start Scan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <Bot className="h-6 w-6 text-primary" /> AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {aiRecommendations.map((rec) => (
                  <div key={rec.text} className={`p-4 rounded-lg border-l-4 ${rec.color}`}>
                    <p className="font-semibold">{rec.text}</p>
                    <p className="text-sm text-muted-foreground">{rec.subtext}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map(action => (
                    <Button key={action.text} variant="outline" className="w-full justify-start">
                        {action.icon}
                        {action.text}
                    </Button>
                ))}
              </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                        <Target className="h-6 w-6 text-primary" /> This Month's Goals
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   {goals.map(goal => (
                       <div key={goal.name}>
                           <div className="flex justify-between items-center text-sm mb-1">
                               <p className="font-medium">{goal.name}</p>
                               <p className="text-muted-foreground">{goal.value}</p>
                           </div>
                           <Progress value={goal.progress} />
                       </div>
                   ))}
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
