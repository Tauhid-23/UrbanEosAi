'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  X,
  Upload,
  Droplets,
  Sun,
  Thermometer,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const initialOverviewItems = [
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

const generateWeeksData = () => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
        data.push({
            name: `Week ${8-i}`,
            'Health': Math.floor(Math.random() * 20 + 80),
            'Growth': Math.floor(Math.random() * 15 + 75)
        });
    }
    return data;
}

const initialPlantGrowth = [
  {
    id: 'tomatoes',
    icon: <Sprout className="h-8 w-8 text-primary" />,
    name: 'Cherry Tomatoes',
    stage: 'Flowering',
    progress: 75,
    days: '45 days',
    healthData: generateWeeksData(),
    vitals: { water: 'Optimal', light: '14h/day', temp: '22°C' },
  },
  {
    id: 'basil',
    icon: <Sprout className="h-8 w-8 text-primary" />,
    name: 'Basil',
    stage: 'Mature',
    progress: 90,
    days: '60 days',
    healthData: generateWeeksData(),
     vitals: { water: 'Optimal', light: '12h/day', temp: '24°C' },
  },
  {
    id: 'peppers',
    icon: <Sprout className="h-8 w-8 text-primary" />,
    name: 'Bell Peppers',
    stage: 'Growing',
    progress: 50,
    days: '30 days',
    healthData: generateWeeksData(),
     vitals: { water: 'Low', light: '13h/day', temp: '23°C' },
  },
  {
    id: 'lettuce',
    icon: <Sprout className="h-8 w-8 text-primary" />,
    name: 'Lettuce',
    stage: 'Seedling',
    progress: 25,
    days: '14 days',
    healthData: generateWeeksData(),
    vitals: { water: 'Optimal', light: '10h/day', temp: '19°C' },
  },
];

const aiRecommendations = [
  {
    text: 'Water your tomatoes',
    subtext: 'Soil moisture is getting low',
    color: 'bg-blue-100 dark:bg-blue-900/30 border-blue-400',
  },
  {
    text: 'Harvest basil leaves',
    subtext: 'Perfect time for maximum flavor',
    color: 'bg-green-100 dark:bg-green-900/30 border-green-400',
  },
  {
    text: 'Add fertilizer to peppers',
    subtext: 'Boost growth with organic nutrients',
    color: 'bg-orange-100 dark:bg-orange-900/30 border-orange-400',
  },
];

const quickActions = [
  {
    icon: <Calendar className="h-5 w-5" />,
    text: 'Schedule Watering',
    action: 'schedule',
  },
  {
    icon: <BarChart className="h-5 w-5" />,
    text: 'View Analytics',
    action: 'analytics',
  },
  {
    icon: <Settings className="h-5 w-5" />,
    text: 'Garden Settings',
    action: 'settings',
  },
];

const goals = [
  { name: 'Plants Added', progress: 66, value: '2/3' },
  { name: 'Harvests', progress: 62.5, value: '5/8' },
  { name: 'Care Sessions', progress: 80, value: '12/15' },
];

export default function DashboardPage() {
  const { toast } = useToast();
  const [plantGrowth, setPlantGrowth] = useState(initialPlantGrowth);
  const [selectedPlant, setSelectedPlant] = useState<typeof initialPlantGrowth[0] | null>(null);
  const [isAddPlantOpen, setAddPlantOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlantGrowth((prevPlants) =>
        prevPlants.map((plant) => {
          const newProgress = Math.min(100, plant.progress + Math.random() * 0.5);
          return { ...plant, progress: newProgress };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleQuickAction = (action: string) => {
    toast({
      title: 'Action Triggered',
      description: `You clicked on "${action}". In a real app, this would perform the action.`,
    });
  };

  const handleSelectPlant = (plant: typeof initialPlantGrowth[0]) => {
    setSelectedPlant(plant);
  }

  const handleAddPlant = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newPlantName = formData.get('plantName') as string;
    const newPlantSpecies = formData.get('plantSpecies') as string;
    
    if (!newPlantName || !newPlantSpecies) {
        toast({
            variant: 'destructive',
            title: 'Missing information',
            description: 'Please fill out all fields.',
        });
        return;
    }

    const newPlant = {
        id: `plant-${Date.now()}`,
        icon: <Sprout className="h-8 w-8 text-primary" />,
        name: newPlantName,
        stage: 'Seedling',
        progress: 5,
        days: '1 day',
        healthData: generateWeeksData(),
        vitals: { water: 'Optimal', light: '12h/day', temp: '22°C' },
    };

    setPlantGrowth(prev => [...prev, newPlant]);
    setAddPlantOpen(false);
    toast({
        title: 'Plant Added!',
        description: `${newPlantName} has been added to your garden.`,
    });
  };

  const plantDetails = useMemo(() => {
      if(!selectedPlant) return null;
      return plantGrowth.find(p => p.id === selectedPlant.id);
  }, [selectedPlant, plantGrowth]);


  return (
    <>
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
            {initialOverviewItems.map((item) => (
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
                  <Button variant="outline" onClick={() => setAddPlantOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add Plant
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {plantGrowth.map((plant) => (
                      <button
                        key={plant.id}
                        className={cn(
                            "w-full text-left bg-secondary/50 p-4 rounded-lg flex items-center gap-4 hover:bg-secondary transition-colors",
                            selectedPlant?.id === plant.id && "ring-2 ring-primary bg-primary/10"
                        )}
                        onClick={() => handleSelectPlant(plant)}
                      >
                        <div className="bg-background p-2 rounded-full">{plant.icon}</div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-baseline mb-1">
                            <p className="font-semibold">
                              {plant.name}{' '}
                              <span className="text-xs text-muted-foreground font-normal">
                                ({plant.stage})
                              </span>
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {plant.days}
                            </p>
                          </div>
                          <Progress value={plant.progress} />
                        </div>
                      </button>
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
                    <h3 className="text-lg font-semibold">Identify Plant Diseases</h3>
                    <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
                      Take a photo or upload an image to instantly identify diseases and get treatment
                      recommendations.
                    </p>
                    <div className="flex gap-4">
                        <Button onClick={() => handleQuickAction('Start Scan')}>
                            <Camera className="mr-2 h-4 w-4" /> Start Scan
                        </Button>
                        <Button variant="outline" onClick={() => handleQuickAction('Upload Image')}>
                            <Upload className="mr-2 h-4 w-4" /> Upload Image
                        </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-8">
              {plantDetails ? (
                <Card className="relative">
                     <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => setSelectedPlant(null)}>
                        <X className="h-4 w-4" />
                    </Button>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-3">
                            <div className="bg-background p-3 rounded-full">{plantDetails.icon}</div>
                            {plantDetails.name}
                        </CardTitle>
                        <CardDescription>Stage: {plantDetails.stage} | Age: {plantDetails.days}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <Label className="text-xs text-muted-foreground">Overall Progress</Label>
                            <Progress value={plantDetails.progress} className="mt-1" />
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-center">
                           <div>
                                <Droplets className="h-6 w-6 mx-auto text-blue-500 mb-1" />
                                <p className="text-sm font-semibold">{plantDetails.vitals.water}</p>
                                <p className="text-xs text-muted-foreground">Water</p>
                           </div>
                           <div>
                                <Sun className="h-6 w-6 mx-auto text-yellow-500 mb-1" />
                                <p className="text-sm font-semibold">{plantDetails.vitals.light}</p>
                                <p className="text-xs text-muted-foreground">Sunlight</p>
                           </div>
                           <div>
                                <Thermometer className="h-6 w-6 mx-auto text-red-500 mb-1" />
                                <p className="text-sm font-semibold">{plantDetails.vitals.temp}</p>
                                <p className="text-xs text-muted-foreground">Temp.</p>
                           </div>
                        </div>

                         <div>
                            <Label className="text-xs text-muted-foreground">Health & Growth Analytics (7 wks)</Label>
                             <div className="h-40 w-full mt-2">
                                <ResponsiveContainer>
                                    <LineChart data={plantDetails.healthData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                        <XAxis dataKey="name" tick={{fontSize: 12}} />
                                        <YAxis tick={{fontSize: 12}} domain={[60, 100]} />
                                        <Tooltip contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))'}}/>
                                        <Line type="monotone" dataKey="Health" stroke="hsl(var(--primary))" strokeWidth={2} />
                                        <Line type="monotone" dataKey="Growth" stroke="hsl(var(--primary) / 0.5)" strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <Button className="w-full">View Full History</Button>
                    </CardContent>
                </Card>
              ) : (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-headline flex items-center gap-2">
                        <Bot className="h-6 w-6 text-primary" /> AI
                        Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {aiRecommendations.map((rec) => (
                        <div
                          key={rec.text}
                          className={`p-4 rounded-lg border-l-4 ${rec.color}`}
                        >
                          <p className="font-semibold">{rec.text}</p>
                          <p className="text-sm text-muted-foreground">
                            {rec.subtext}
                          </p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-headline">
                        Quick Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {quickActions.map((action) => (
                        <Button
                          key={action.text}
                          variant="outline"
                          className="w-full justify-start gap-2"
                          onClick={() => handleQuickAction(action.text)}
                        >
                          {action.icon}
                          {action.text}
                        </Button>
                      ))}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-headline flex items-center gap-2">
                        <Target className="h-6 w-6 text-primary" /> This
                        Month's Goals
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {goals.map((goal) => (
                        <div key={goal.name}>
                          <div className="flex justify-between items-center text-sm mb-1">
                            <p className="font-medium">{goal.name}</p>
                            <p className="text-muted-foreground">
                              {goal.value}
                            </p>
                          </div>
                          <Progress value={goal.progress} />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Dialog open={isAddPlantOpen} onOpenChange={setAddPlantOpen}>
        <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleAddPlant}>
          <DialogHeader>
            <DialogTitle>Add a New Plant</DialogTitle>
            <DialogDescription>
              Enter the details of your new plant to add it to your garden tracker.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="plantName" className="text-right">
                Plant Name
              </Label>
              <Input
                id="plantName"
                name="plantName"
                placeholder="e.g., Cherry Tomato"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="plantSpecies" className="text-right">
                Species
              </Label>
              <Input
                id="plantSpecies"
                name="plantSpecies"
                placeholder="e.g., Solanum lycopersicum"
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setAddPlantOpen(false)}>Cancel</Button>
            <Button type="submit">Add Plant</Button>
          </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
