
import React from 'react';
import { PawIcon } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-center p-4">
      {/* Background Decorations - Escondidos na impressão */}
      <div className="no-print absolute top-[-50px] left-[-50px] text-orange-900/20 -rotate-12">
        <PawIcon className="w-64 h-64" />
      </div>
      <div className="no-print absolute bottom-[-50px] right-[-50px] text-orange-900/20 rotate-45">
        <PawIcon className="w-80 h-80" />
      </div>

      {/* Content Container */}
      <main className="print-container w-full max-w-lg z-10 bg-[#3e2723] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden border-8 border-[#5d4037] flex flex-col">
        {children}
      </main>

      {/* Footer / Brand */}
      <footer className="no-print mt-8 z-10 text-center">
        <p className="text-orange-200 font-fredoka font-medium text-lg flex items-center gap-2 drop-shadow-lg">
          <PawIcon className="w-5 h-5" /> Adolpho faz 11 <PawIcon className="w-5 h-5" />
        </p>
      </footer>
    </div>
  );
};

export default Layout;
