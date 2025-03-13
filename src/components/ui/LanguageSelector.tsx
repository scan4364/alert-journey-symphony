
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useLanguage, Language } from '@/i18n/LanguageContext';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LanguageSelectorProps {
  variant?: 'icon' | 'button';
  className?: string;
}

export function LanguageSelector({ 
  variant = 'icon',
  className 
}: LanguageSelectorProps) {
  const { language, setLanguage, t } = useLanguage();

  const languages: { value: Language; label: string }[] = [
    { value: 'en', label: t('language.en') },
    { value: 'pt', label: t('language.pt') },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {variant === 'icon' ? (
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn("rounded-full", className)}
            aria-label={t('common.language')}
          >
            <Globe className="h-5 w-5" />
          </Button>
        ) : (
          <Button 
            variant="outline" 
            size="sm" 
            className={cn("flex items-center gap-2", className)}
          >
            <Globe className="h-4 w-4" />
            {languages.find(lang => lang.value === language)?.label}
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.value}
            onClick={() => setLanguage(lang.value)}
            className={cn(
              "cursor-pointer",
              language === lang.value && "font-medium bg-secondary"
            )}
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
