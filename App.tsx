
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Components
import { Header } from './src/components/Header';
import { Tabs } from './src/components/Tabs';
import { HelpBotButton } from './src/components/HelpBotButton';
import { FeedbackButton } from './src/components/FeedbackButton';
import { HelpBotModal } from './src/components/HelpBotModal';
import { GeneratorView } from './src/features/generator/GeneratorView';
import { ValidatorView } from './src/features/validator/ValidatorView';

const App: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'generator' | 'validator'>('generator');
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  return (
    <div className="container mx-auto p-4 max-w-4xl min-h-screen flex flex-col font-open-sans">
      <Header />

      <main className="flex-grow bg-[var(--llyc-white)] p-6 sm:p-8 rounded-xl shadow-lg mb-8 border border-[var(--llyc-gray-4)] overflow-y-auto">
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="mt-6">
          {activeTab === 'generator' && <GeneratorView />}
          {activeTab === 'validator' && <ValidatorView />}
        </div>
      </main>

      <footer className="text-center py-6 text-[var(--llyc-gray-2)] text-sm font-open-sans">
        <p>{t('footer.apiKeyWarning')}</p>
        <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
      </footer>

      <div className="fixed bottom-8 right-8 flex flex-col items-center space-y-4 z-40">
          <HelpBotButton onClick={() => setIsHelpModalOpen(true)} />
          <FeedbackButton />
      </div>

      <HelpBotModal 
          isOpen={isHelpModalOpen}
          onClose={() => setIsHelpModalOpen(false)}
      />
    </div>
  );
};

export default App;
