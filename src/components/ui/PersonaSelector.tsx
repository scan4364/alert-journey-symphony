
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PERSONAS, PersonaType } from '@/utils/alertTypes';
import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

interface PersonaSelectorProps {
  selectedPersona: string | null;
  onSelectPersona: (personaId: string) => void;
  className?: string;
}

export function PersonaSelector({ 
  selectedPersona, 
  onSelectPersona, 
  className 
}: PersonaSelectorProps) {
  const { t } = useLanguage();
  
  // Get icon from string name
  const getIconComponent = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.User;
    return <Icon className="h-8 w-8 mb-2" />;
  };

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-4', className)}>
      {PERSONAS.map((persona) => {
        const isSelected = selectedPersona === persona.id;
        // Convert kebab-case to PascalCase for icon name
        const iconName = persona.icon
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');
        
        return (
          <Card 
            key={persona.id}
            className={cn(
              'relative cursor-pointer transition-all hover:shadow-md',
              isSelected ? 'ring-2 ring-primary' : 'hover:scale-[1.02]'
            )}
            onClick={() => onSelectPersona(persona.id)}
          >
            {isSelected && (
              <div className="absolute top-3 right-3">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
            )}
            
            <CardHeader className="pb-2 text-center">
              <div className="flex justify-center">{getIconComponent(iconName)}</div>
              <CardTitle className="font-display">{persona.name}</CardTitle>
              <CardDescription>{persona.description}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Default Alert Types:
              </p>
              <div className="flex flex-wrap mt-2 gap-1">
                {persona.defaultAlertTypes.map(type => (
                  <span 
                    key={type} 
                    className="text-xs bg-secondary px-2 py-1 rounded-full"
                  >
                    {type.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  );
}
