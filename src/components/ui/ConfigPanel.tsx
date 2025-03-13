
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { 
  AlertType, 
  AlertPriority, 
  AlertStatus 
} from '@/utils/alertTypes';
import { useAlerts } from '@/context/AlertContext';
import { toast } from 'sonner';
import { Clock, Save, RotateCw } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from '@/lib/utils';

interface ConfigPanelProps {
  className?: string;
}

export function ConfigPanel({ className }: ConfigPanelProps) {
  const { processingInterval, setProcessingInterval } = useAlerts();
  const [selectedInterval, setSelectedInterval] = useState(processingInterval);
  const [enabledAlertTypes, setEnabledAlertTypes] = useState<{[key in AlertType]?: boolean}>({
    'route-deviation': true,
    'weather-condition': true,
    'mechanical-issue': true,
    'traffic-congestion': true,
    'security-breach': true,
    'schedule-change': true,
    'fuel-status': true,
    'system-notification': true,
  });
  
  // Available alert types
  const alertTypes: { value: AlertType, label: string }[] = [
    { value: 'route-deviation', label: 'Route Deviation' },
    { value: 'weather-condition', label: 'Weather Conditions' },
    { value: 'mechanical-issue', label: 'Mechanical Issues' },
    { value: 'traffic-congestion', label: 'Traffic Congestion' },
    { value: 'security-breach', label: 'Security Breaches' },
    { value: 'schedule-change', label: 'Schedule Changes' },
    { value: 'fuel-status', label: 'Fuel Status' },
    { value: 'system-notification', label: 'System Notifications' },
  ];
  
  // Handle interval change
  const handleIntervalChange = (value: number[]) => {
    setSelectedInterval(value[0]);
  };
  
  // Toggle alert type
  const toggleAlertType = (type: AlertType) => {
    setEnabledAlertTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };
  
  // Save configuration
  const saveConfiguration = () => {
    setProcessingInterval(selectedInterval);
    
    toast.success('Configuration saved', {
      description: `Alert processing interval set to ${selectedInterval} minutes.`,
    });
  };

  return (
    <Card className={cn('max-w-3xl mx-auto', className)}>
      <CardHeader>
        <CardTitle className="font-display text-2xl">Alert Configuration</CardTitle>
        <CardDescription>
          Customize how alerts are processed and displayed
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Processing Interval */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="interval" className="text-base">Processing Interval</Label>
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-1" />
              <span>{selectedInterval} minutes</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">1m</span>
            <Slider
              id="interval"
              min={1}
              max={60}
              step={1}
              defaultValue={[processingInterval]}
              value={[selectedInterval]}
              onValueChange={handleIntervalChange}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground">60m</span>
          </div>
          
          <p className="text-xs text-muted-foreground italic">
            Alerts will be processed and consolidated every {selectedInterval} minutes to avoid notification overload.
          </p>
        </div>
        
        {/* Alert Types */}
        <div className="space-y-4">
          <Label className="text-base">Alert Types</Label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {alertTypes.map(type => (
              <div key={type.value} className="flex items-center justify-between p-3 bg-card border rounded-md">
                <Label htmlFor={type.value} className="cursor-pointer">{type.label}</Label>
                <Switch
                  id={type.value}
                  checked={enabledAlertTypes[type.value] ?? true}
                  onCheckedChange={() => toggleAlertType(type.value)}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Alert Thresholds */}
        <div className="space-y-4">
          <Label className="text-base">Priority Thresholds</Label>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="high-threshold">High Priority</Label>
              <Select defaultValue="immediate">
                <SelectTrigger>
                  <SelectValue placeholder="Select threshold" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="5min">5 minutes</SelectItem>
                  <SelectItem value="10min">10 minutes</SelectItem>
                  <SelectItem value="15min">15 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="medium-threshold">Medium Priority</Label>
              <Select defaultValue="15min">
                <SelectTrigger>
                  <SelectValue placeholder="Select threshold" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="5min">5 minutes</SelectItem>
                  <SelectItem value="10min">10 minutes</SelectItem>
                  <SelectItem value="15min">15 minutes</SelectItem>
                  <SelectItem value="30min">30 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="low-threshold">Low Priority</Label>
              <Select defaultValue="30min">
                <SelectTrigger>
                  <SelectValue placeholder="Select threshold" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15min">15 minutes</SelectItem>
                  <SelectItem value="30min">30 minutes</SelectItem>
                  <SelectItem value="60min">60 minutes</SelectItem>
                  <SelectItem value="batch">Daily Batch</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Notification Settings */}
        <div className="space-y-4">
          <Label className="text-base">Notification Preferences</Label>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Push Notifications</h4>
                <p className="text-sm text-muted-foreground">Receive alerts on your device</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">SMS Alerts</h4>
                <p className="text-sm text-muted-foreground">Get critical alerts via text message</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Email Digest</h4>
                <p className="text-sm text-muted-foreground">Daily summary of all alerts</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" className="w-32" onClick={() => setSelectedInterval(processingInterval)}>
          <RotateCw className="h-4 w-4 mr-2" />
          Reset
        </Button>
        <Button className="w-32" onClick={saveConfiguration}>
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
