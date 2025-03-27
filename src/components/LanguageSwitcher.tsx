
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <button 
      onClick={toggleLanguage}
      className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm hover:bg-white/30 px-3 py-1.5 rounded-full text-sm font-medium transition-colors hover:text-purple"
      aria-label={language === 'en' ? 'Switch to Spanish' : 'Switch to English'}
    >
      <Globe className="h-4 w-4" />
      <span>{language === 'en' ? 'ES' : 'EN'}</span>
    </button>
  );
};

export default LanguageSwitcher;
