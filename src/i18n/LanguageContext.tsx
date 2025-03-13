
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { en } from './locales/en';
import { pt } from './locales/pt';

// Tipo para as traduções
export type TranslationsType = typeof en;

// Tipo para as linguagens suportadas
export type Language = 'en' | 'pt';

// Interface para o contexto
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Valor padrão do contexto
const defaultValue: LanguageContextType = {
  language: 'en',
  setLanguage: () => {},
  t: () => '',
};

// Criação do contexto
const LanguageContext = createContext<LanguageContextType>(defaultValue);

// Traduções disponíveis
const translations: Record<Language, TranslationsType> = {
  en,
  pt,
};

// Props do provider
interface LanguageProviderProps {
  children: ReactNode;
}

// Componente Provider
export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Verifica se há um idioma salvo no localStorage
  const getSavedLanguage = (): Language => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'en';
  };

  const [language, setLanguageState] = useState<Language>(getSavedLanguage());

  // Função para mudar o idioma
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    
    // Mostra uma notificação quando o idioma é alterado
    const langNames = {
      en: 'English',
      pt: 'Português'
    };
    
    toast.success(
      lang === 'en' ? 'Language changed to English' : 'Idioma alterado para Português', 
      { 
        description: lang === 'en' 
          ? 'The application will now display in English' 
          : 'A aplicação agora será exibida em Português'
      }
    );
  };

  // Função para obter uma tradução a partir de uma chave
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    if (typeof value === 'string') {
      return value;
    }

    console.warn(`Translation is not a string: ${key}`);
    return key;
  };

  // Efeito para quando o idioma mudar
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook para usar o contexto
export const useLanguage = () => useContext(LanguageContext);
