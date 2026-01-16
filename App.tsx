
import React, { useState } from 'react';
import { AppStep, UserData } from './types';
import { PARTY_DETAILS } from './constants';
import { generateDogMessage } from './services/geminiService';
import Layout from './components/Layout';
import WelcomeStep from './components/WelcomeStep';
import CameraStep from './components/CameraStep';
import InvitationStep from './components/InvitationStep';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.WELCOME);
  const [userData, setUserData] = useState<UserData>({
    name: '',
    photoUrl: null,
    aiMessage: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleNameSubmit = (name: string) => {
    setUserData(prev => ({ ...prev, name }));
    setCurrentStep(AppStep.CAMERA);
  };

  const handlePhotoCapture = async (photo: string) => {
    setUserData(prev => ({ ...prev, photoUrl: photo }));
    setCurrentStep(AppStep.GENERATING);
    setIsGenerating(true);

    // Get AI personalized message while transitioning
    const message = await generateDogMessage(userData.name);
    
    setUserData(prev => ({ ...prev, aiMessage: message }));
    
    // Simulate a brief "processing" delay for aesthetic "crafting" feel
    setTimeout(() => {
      setIsGenerating(false);
      setCurrentStep(AppStep.INVITATION);
    }, 1500);
  };

  const resetApp = () => {
    setUserData({ name: '', photoUrl: null, aiMessage: '' });
    setCurrentStep(AppStep.WELCOME);
  };

  const renderContent = () => {
    if (isGenerating) {
      return (
        <div className="p-12 text-center space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 border-8 border-orange-100 border-t-orange-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl animate-pulse">🦴</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-fredoka font-bold text-gray-800">Cãofabulando...</h2>
            <p className="text-gray-500 italic">"Adolpho está escrevendo uma mensagem especial para você e preparando os petiscos!"</p>
          </div>
        </div>
      );
    }

    switch (currentStep) {
      case AppStep.WELCOME:
        return <WelcomeStep onNext={handleNameSubmit} />;
      case AppStep.CAMERA:
        return (
          <CameraStep 
            guestName={userData.name} 
            onCapture={handlePhotoCapture} 
            onBack={() => setCurrentStep(AppStep.WELCOME)} 
          />
        );
      case AppStep.INVITATION:
        return (
          <InvitationStep 
            userData={userData} 
            partyInfo={PARTY_DETAILS} 
            onReset={resetApp} 
          />
        );
      default:
        return <WelcomeStep onNext={handleNameSubmit} />;
    }
  };

  return (
    <Layout>
      {renderContent()}
    </Layout>
  );
};

export default App;
