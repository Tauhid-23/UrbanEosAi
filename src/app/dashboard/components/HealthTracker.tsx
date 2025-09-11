'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { userPlants } from '@/lib/data';

export function HealthTracker() {
    const { toast } = useToast();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        toast({
            title: "Log Submitted!",
            description: "Your plant's progress has been saved.",
        });
        (event.target as HTMLFormElement).reset();
    };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline">Plant Health Tracker</CardTitle>
        <CardDescription>Log watering, growth, and other notes for your plants.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="plant-select">Select Plant</Label>
            <Select required>
              <SelectTrigger id="plant-select">
                <SelectValue placeholder="Choose a plant to update" />
              </SelectTrigger>
              <SelectContent>
                {userPlants.map(plant => (
                    <SelectItem key={plant.id} value={plant.id}>{plant.name} - ({plant.species})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="update-type">Update Type</Label>
            <Select required>
              <SelectTrigger id="update-type">
                <SelectValue placeholder="Select an update type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="watering">Watering</SelectItem>
                <SelectItem value="growth">Growth Update</SelectItem>
                <SelectItem value="treatment">Treatment</SelectItem>
                <SelectItem value="observation">General Observation</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="e.g., Watered with 2 cups of water, new leaf unfurled..." />
          </div>
          <Button type="submit" className="w-full">Save Log</Button>
        </form>
      </CardContent>
    </Card>
  );
}
