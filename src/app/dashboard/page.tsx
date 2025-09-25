
'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
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
  Upload,
  Droplets,
  Sun,
  Thermometer,
  VideoOff,
  AlertCircle,
  Loader2,
  Sparkles,
  Flower,
  BookOpen,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
} from 'recharts';
import withAuth from '@/components/withAuth';
import { useAuth } from '@/context/AuthContext';
import { analyzePlantGrowth, AnalyzePlantGrowthOutput } from '@/ai/flows/analyze-plant-growth';

const generateWeeksData = () => {
  const data = [];
  for (let i = 6; i >= 0; i--) {
    data.push({
      name: `Week ${8 - i}`,
      Health: Math.floor(Math.random() * 20 + 80),
      Growth: Math.floor(Math.random() * 15 + 75),
    });
  }
  return data;
};

const emptyGrowthData = [
    { name: 'Day 1', "Growth %": 0 },
    { name: 'Day 2', "Growth %": 0 },
    { name: 'Day 3', "Growth %": 0 },
    { name: 'Day 4', "Growth %": 0 },
    { name: 'Day 5', "Growth %": 0 },
];

const aiRecommendations = [
  {
    text: 'Water your tomatoes',
    subtext: 'Soil moisture is getting low',
    color: 'bg-blue-100 dark:bg-blue-900/30 border-blue-400',
    icon: <Droplets className="h-5 w-5 text-blue-500" />,
  },
  {
    text: 'Harvest basil leaves',
    subtext: 'Perfect time for maximum flavor',
    color: 'bg-green-100 dark:bg-green-900/30 border-green-400',
    icon: <Sprout className="h-5 w-5 text-green-500" />,
  },
  {
    text: 'Add fertilizer to peppers',
    subtext: 'Boost growth with organic nutrients',
    color: 'bg-orange-100 dark:bg-orange-900/30 border-orange-400',
    icon: <Flower className="h-5 w-5 text-orange-500" />,
  },
];


function DashboardPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [plantGrowth, setPlantGrowth] = useState<any[]>([]);
  const [isAddPlantOpen, setAddPlantOpen] = useState(false);
  const [isScanMode, setScanMode] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeAccordionItem, setActiveAccordionItem] = useState<string[]>([]);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalyzePlantGrowthOutput | null>(null);

  useEffect(() => {
    // Simulate fetching user's plant data
    // In a real app, you'd fetch this from your database (e.g., Firestore)
  }, [user]);

  const overviewItems = useMemo(() => {
    const harvestReadyCount = plantGrowth.filter(p => p.progress > 85).length;
    const avgGrowth = plantGrowth.length > 0 ? Math.round(plantGrowth.reduce((acc, p) => acc + p.progress, 0) / plantGrowth.length) : 0;
    const healthScoreValue = plantGrowth.length > 0 ? 92 : 0; // Example static health score when plants exist
    
    return [
      {
        icon: <Leaf className="h-6 w-6 text-green-500" />,
        title: 'Active Plants',
        value: plantGrowth.length.toString(),
        progress: plantGrowth.length > 0 ? (plantGrowth.length / 5) * 100 : 0, // Example goal of 5 plants
        color: 'text-green-500',
      },
      {
        icon: <TrendingUp className="h-6 w-6 text-blue-500" />,
        title: 'Avg. Growth',
        value: `${avgGrowth}%`,
        progress: avgGrowth,
        color: 'text-blue-500',
      },
      {
        icon: <ClipboardList className="h-6 w-6 text-yellow-500" />,
        title: 'Harvest Ready',
        value: harvestReadyCount.toString(),
        progress: harvestReadyCount > 0 ? (harvestReadyCount / plantGrowth.length) * 100 : 0,
        color: 'text-yellow-500',
      },
      {
        icon: <BarChart className="h-6 w-6 text-red-500" />,
        title: 'Health Score',
        value: plantGrowth.length > 0 ? `${healthScoreValue}/100` : 'N/A',
        progress: healthScoreValue,
        color: 'text-red-500',
      },
    ]
  }, [plantGrowth]);

   const goals = useMemo(() => [
    { name: 'Add 1 Plant 🌱', progress: plantGrowth.length > 0 ? 100 : 0, value: `${Math.min(1, plantGrowth.length)}/1` },
    { name: 'Water plants 5 times 💧', progress: 0, value: '0/5' },
    { name: 'Harvest 1 plant 🥬', progress: 0, value: '0/1' },
  ], [plantGrowth]);


  useEffect(() => {
    const interval = setInterval(() => {
        if (plantGrowth.length > 0) {
            setPlantGrowth((prevPlants) =>
                prevPlants.map((plant) => {
                const newProgress = Math.min(100, plant.progress + Math.random() * 0.5);
                return { ...plant, progress: newProgress };
                })
            );
        }
    }, 2000);

    return () => clearInterval(interval);
  }, [plantGrowth]);

  useEffect(() => {
    if (isScanMode) {
      const getCameraPermission = async () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
           toast({
             variant: 'destructive',
             title: 'Camera Not Supported',
             description: 'Your browser does not support camera access.',
           });
           setHasCameraPermission(false);
           return;
        }

        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
          setHasCameraPermission(true);
  
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description: 'Please enable camera permissions in your browser settings to use this app.',
          });
        }
      };
  
      getCameraPermission();

      return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
      }
    }
  }, [isScanMode, toast]);

  const handleQuickAction = (action: string) => {
    if (action === 'Start Scan') {
        setScanMode(true);
    } else {
        toast({
            title: 'Action Triggered',
            description: `You clicked on "${action}". In a real app, this would perform the action.`,
        });
    }
  };

  const addOrUpdatePlantFromAnalysis = (result: AnalyzePlantGrowthOutput) => {
    const existingPlantIndex = plantGrowth.findIndex(p => p.name.toLowerCase() === result.plantType.toLowerCase());

    const newPlantData = {
      name: result.plantType,
      stage: result.growthStage.charAt(0).toUpperCase() + result.growthStage.slice(1),
      progress: result.growthProgress,
      healthData: generateWeeksData(), // generate new historical data
      vitals: { water: 'Optimal', light: 'Optimal', temp: `${result.healthScore}/100` },
      icon: <Sprout className="h-8 w-8 text-primary" />,
      days: 'Just updated',
    };
    
    if (existingPlantIndex > -1) {
      // Update existing plant
      setPlantGrowth(prev => {
        const newPlants = [...prev];
        const plantToUpdate = newPlants[existingPlantIndex];
        newPlants[existingPlantIndex] = { ...plantToUpdate, ...newPlantData, id: plantToUpdate.id };
        return newPlants;
      });
      toast({
        title: 'Plant Updated!',
        description: `${result.plantType} has been updated with the new analysis.`,
      });
      // Expand the updated plant's accordion
      setActiveAccordionItem(prev => [...new Set([...prev, plantGrowth[existingPlantIndex].id])]);

    } else {
      // Add as a new plant
      const newPlant = {
        id: `plant-${Date.now()}`,
        ...newPlantData,
      };
      setPlantGrowth(prev => [...prev, newPlant]);
      toast({
        title: 'New Plant Analyzed & Added!',
        description: `${result.plantType} has been added to your tracker.`,
      });
      // Expand the new plant's accordion
       setActiveAccordionItem(prev => [...new Set([...prev, newPlant.id])]);
    }
  };


  const handleImageAnalysis = async (dataUri: string) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    toast({
      title: 'Analyzing Plant...',
      description: 'The AI is inspecting your plant, please wait.',
    });
    try {
      const result = await analyzePlantGrowth({ photoDataUri: dataUri });
      setAnalysisResult(result);
      addOrUpdatePlantFromAnalysis(result);
    } catch (error) {
      console.error('Error analyzing plant growth:', error);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: 'Could not analyze the plant. Please try again.',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUri = e.target?.result as string;
        if (dataUri) {
          handleImageAnalysis(dataUri);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = () => {
    if (videoRef.current) {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const context = canvas.getContext('2d');
        if (context) {
            context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const dataUri = canvas.toDataURL('image/png');
            handleImageAnalysis(dataUri);
            setScanMode(false);
        }
    }
  };

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

    setPlantGrowth((prev) => [...prev, newPlant]);
    setAddPlantOpen(false);
    toast({
      title: 'Plant Added!',
      description: `${newPlantName} has been added to your garden.`,
    });
  };

  return (
    <>
      <div className="bg-secondary/30 min-h-screen-minus-header p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold font-headline">
              Welcome back, <span className="text-primary">{user?.displayName || 'Gardener'}!</span>
            </h1>
            <p className="text-muted-foreground mt-2">
              {plantGrowth.length > 0 ? "Your urban garden is thriving. Here's your progress overview." : "Ready to grow? Add your first plant to get started."}
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {overviewItems.map((item) => (
                <Card key={item.title} className="p-6 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                        <div className={`bg-primary/10 p-3 rounded-lg ${item.color}`}>
                            {item.icon}
                        </div>
                        <div className="relative h-12 w-12">
                            <svg className="w-full h-full" viewBox="0 0 36 36">
                                <path
                                className="text-secondary/50 stroke-current"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                strokeWidth="3"
                                ></path>
                                <path
                                className={`${item.color} stroke-current`}
                                strokeDasharray={`${item.progress}, 100`}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                strokeLinecap="round"
                                strokeWidth="3"
                                ></path>
                            </svg>
                             <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">{item.progress.toFixed(0)}%</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-2xl font-bold">{item.value}</p>
                        <p className="text-sm text-muted-foreground">{item.title}</p>
                    </div>
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
                        Monitor your plants' development and health.
                    </p>
                    </div>
                    <Button variant="outline" onClick={() => setAddPlantOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" /> Add Plant
                    </Button>
                </CardHeader>
                <CardContent>
                  {plantGrowth.length > 0 ? (
                    <Accordion type="multiple" className="w-full" onValueChange={setActiveAccordionItem} value={activeAccordionItem}>
                      {plantGrowth.map((plant) => (
                        <AccordionItem value={plant.id} key={plant.id}>
                          <AccordionTrigger className="hover:no-underline">
                            <div
                              className="w-full text-left p-4 rounded-lg flex items-center gap-4"
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
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="px-4 pb-4">
                                  <div className="grid md:grid-cols-2 gap-6">
                                      <div className="space-y-6">
                                          <div>
                                              <Label className="text-xs text-muted-foreground">Overall Progress</Label>
                                              <Progress value={plant.progress} className="mt-1" />
                                          </div>
                                          <div className="grid grid-cols-3 gap-4 text-center">
                                          <div>
                                              <Droplets className="h-6 w-6 mx-auto text-blue-500 mb-1" />
                                              <p className="text-sm font-semibold">{plant.vitals.water}</p>
                                              <p className="text-xs text-muted-foreground">Water</p>
                                          </div>
                                          <div>
                                              <Sun className="h-6 w-6 mx-auto text-yellow-500 mb-1" />
                                              <p className="text-sm font-semibold">{plant.vitals.light}</p>
                                              <p className="text-xs text-muted-foreground">Sunlight</p>
                                          </div>
                                          <div>
                                              <Thermometer className="h-6 w-6 mx-auto text-red-500 mb-1" />
                                              <p className="text-sm font-semibold">{plant.vitals.temp}</p>
                                              <p className="text-xs text-muted-foreground">Temp.</p>
                                          </div>
                                          </div>
                                          <Button className="w-full" onClick={() => toast({ title: 'Viewing Full History', description: `Details for ${plant.name}`})}>View Full History</Button>
                                      </div>
                                      <div>
                                          <Label className="text-xs text-muted-foreground">Health & Growth Analytics (7 wks)</Label>
                                          <div className="h-40 w-full mt-2">
                                              <ResponsiveContainer>
                                                  <LineChart data={plant.healthData}>
                                                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                                      <XAxis dataKey="name" tick={{fontSize: 12}} />
                                                      <YAxis tick={{fontSize: 12}} domain={[60, 100]} />
                                                      <Tooltip contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))'}}/>
                                                      <Line type="monotone" dataKey="Health" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                                                      <Line type="monotone" dataKey="Growth" stroke="hsl(var(--primary) / 0.5)" strokeWidth={2} dot={false} />
                                                  </LineChart>
                                              </ResponsiveContainer>
                                          </div>
                                      </div>
                                  </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <div className="text-center py-12 px-4 border-2 border-dashed rounded-lg flex flex-col items-center">
                         <div className="relative h-32 w-32 mb-4">
                            <svg className="w-full h-full" viewBox="0 0 36 36">
                                <path
                                className="text-secondary stroke-current"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                strokeWidth="3"
                                ></path>
                                <path
                                className="text-primary stroke-current"
                                strokeDasharray="0, 100"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                strokeLinecap="round"
                                strokeWidth="3"
                                ></path>
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-primary">0%</span>
                        </div>
                        <h3 className="mt-2 text-lg font-medium text-foreground">
                            Your Garden is Ready to Grow
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                        Add your first plant to start tracking its growth.
                        </p>
                        <Button className="mt-6" onClick={() => setAddPlantOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" /> Add Plant
                        </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Plant Growth Trend</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-48 w-full">
                        <ResponsiveContainer>
                            <LineChart data={emptyGrowthData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                                <XAxis dataKey="name" tick={{fontSize: 12}} />
                                <YAxis dataKey="Growth %" tick={{fontSize: 12}} />
                                <Tooltip contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))'}}/>
                                <Line type="monotone" dataKey="Growth %" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2">
                        <Camera className="h-6 w-6 text-primary" /> AI Disease Detection
                        </CardTitle>
                        <CardDescription>
                        Scan your plants for health issues.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 rounded-lg bg-secondary/50 flex flex-col items-center text-center">
                             <div className="h-24 w-full flex items-center justify-center opacity-30">
                                <BarChart className="h-16 w-16 text-muted-foreground" />
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">No scans yet.</p>
                             <div className="flex gap-4">
                                <Button onClick={() => handleQuickAction('Start Scan')}>
                                    <Camera className="mr-2 h-4 w-4" /> Scan
                                </Button>
                                <Button variant="outline" asChild>
                                    <Label htmlFor="upload-image-disease" className="cursor-pointer">
                                        <Upload className="mr-2 h-4 w-4" /> Upload
                                        <Input id="upload-image-disease" type="file" className="sr-only" accept="image/*" onChange={(e) => toast({ title: 'Image Uploaded', description: 'Ready for disease analysis.' })} />
                                    </Label>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2">
                        <Sparkles className="h-6 w-6 text-primary" /> AI Growth Analysis
                        </CardTitle>
                        <CardDescription>
                        Get insights on your plant's progress.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="flex gap-4">
                            <Button className="w-full" onClick={() => handleQuickAction('Start Scan')}>
                                <Camera className="mr-2 h-4 w-4" /> Start Scan
                            </Button>
                            <Button variant="outline" className="w-full" asChild>
                                <Label htmlFor="upload-image-growth" className="cursor-pointer">
                                    <Upload className="mr-2 h-4 w-4" /> Upload Image
                                    <Input id="upload-image-growth" type="file" className="sr-only" accept="image/*" onChange={handleFileSelect} />
                                </Label>
                            </Button>
                        </div>
                        {isAnalyzing && (
                            <div className="flex items-center justify-center gap-2 text-muted-foreground">
                                <Loader2 className="h-5 w-5 animate-spin" />
                                <span>Analyzing your plant...</span>
                            </div>
                        )}
                        {analysisResult && (
                             <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                                <CardHeader>
                                    <CardTitle className="text-lg">Analysis Complete</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm space-y-2">
                                    <p><strong>Plant Type:</strong> {analysisResult.plantType}</p>
                                    <p><strong>Growth Stage:</strong> {analysisResult.growthStage}</p>
                                    <p><strong>Growth Progress:</strong> {analysisResult.growthProgress}%</p>
                                    <p><strong>Health Score:</strong> {analysisResult.healthScore}/100</p>
                                </CardContent>
                            </Card>
                        )}
                    </CardContent>
                </Card>
              </div>
            </div>
            <div className="space-y-8">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                    <Target className="h-6 w-6 text-yellow-500" /> This Month's Goals
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
                        <Progress value={goal.progress} className="h-2 [&>div]:bg-yellow-400" />
                    </div>
                    ))}
                </CardContent>
                </Card>
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
                        className={`p-3 rounded-lg border-l-4 flex items-center gap-3 ${rec.color}`}
                    >
                        {rec.icon}
                        <div>
                            <p className="font-semibold">{rec.text}</p>
                            <p className="text-sm text-muted-foreground">
                            {rec.subtext}
                            </p>
                        </div>
                    </div>
                    ))}
                </CardContent>
                </Card>
                 <Card>
                  <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                     <BookOpen className="h-6 w-6" /> Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-2"
                        onClick={() => toast({ title: 'Quick Action', description: 'Calendar triggered.'})}
                      >
                        <Calendar className="h-5 w-5" /> Schedule Watering
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-2"
                        onClick={() => toast({ title: 'Quick Action', description: 'Analytics triggered.'})}
                      >
                        <BarChart className="h-5 w-5" /> View Analytics
                      </Button>
                       <Button
                        variant="outline"
                        className="w-full justify-start gap-2"
                        onClick={() => toast({ title: 'Quick Action', description: 'Settings triggered.'})}
                      >
                        <Settings className="h-5 w-5" /> Garden Settings
                      </Button>
                  </CardContent>
                </Card>
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
      <Dialog open={isScanMode} onOpenChange={setScanMode}>
        <DialogContent className="max-w-md w-full">
            <DialogHeader>
                <DialogTitle>Scan Plant</DialogTitle>
                <DialogDescription>
                    Center your plant in the frame and take a picture.
                </DialogDescription>
            </DialogHeader>
            <div className="relative aspect-video bg-secondary rounded-md overflow-hidden flex items-center justify-center">
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                {hasCameraPermission === false && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 p-4">
                         <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Camera Access Denied</AlertTitle>
                            <AlertDescription>
                                Please allow camera access in your browser settings to use this feature.
                            </AlertDescription>
                        </Alert>
                    </div>
                )}
                 {hasCameraPermission === null && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 p-4">
                        <p>Requesting camera permission...</p>
                    </div>
                 )}
            </div>
            <DialogFooter className="sm:justify-between">
                 <Button variant="outline" onClick={() => setScanMode(false)}>
                    <VideoOff className="mr-2 h-4 w-4" />
                    Cancel
                </Button>
                <Button onClick={handleCapture} disabled={!hasCameraPermission}>
                    <Camera className="mr-2 h-4 w-4" />
                    Capture
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default withAuth(DashboardPage);
