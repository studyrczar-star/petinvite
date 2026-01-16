
import React, { useRef, useState } from 'react';
import Button from './Button';
import { UserData, PartyInfo } from '../types';
import { PawIcon } from '../constants';
import html2canvas from 'html2canvas';

interface InvitationStepProps {
  userData: UserData;
  partyInfo: PartyInfo;
  onReset: () => void;
}

const InvitationStep: React.FC<InvitationStepProps> = ({ userData, partyInfo, onReset }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    try {
      // Capturamos apenas a parte do convite (sem os botões de ação)
      const canvas = await html2canvas(cardRef.current, {
        scale: 2, // Aumenta a qualidade
        useCORS: true,
        logging: false,
        backgroundColor: '#f4e4bc'
      });
      
      const link = document.createElement('a');
      link.download = `Convite_Adolpho_${userData.name}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error("Erro ao gerar imagem:", err);
      alert("Não foi possível gerar a imagem. Tente a opção de Impressão/PDF.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col h-full bg-[#f4e4bc]">
      {/* Área Capturável para Imagem/PDF */}
      <div ref={cardRef} className="flex flex-col bg-[#f4e4bc] parchment-texture">
        {/* Header Plaque */}
        <div className="bg-[#5d4037] wood-texture p-6 text-center shadow-2xl border-b-4 border-[#3e2723] relative">
          <h2 className="text-white text-2xl font-fredoka font-bold uppercase tracking-widest drop-shadow-md">
            CONVOCAÇÃO DA MATILHA:
          </h2>
          <h3 className="text-orange-400 text-4xl font-fredoka font-black drop-shadow-lg leading-tight">
            O ADOLPHO FAZ 11!
          </h3>
        </div>

        <div className="p-6 space-y-6">
          {/* Intro Text */}
          <p className="text-amber-950 font-typewriter text-lg leading-relaxed border-b border-amber-300 pb-4 italic text-center">
            "Dizem que a vida começa aos 40, mas na contagem canina, eu já sou um ancião respeitado!"
          </p>

          {/* Fotos Lado a Lado */}
          <div className="flex gap-4 items-end">
            <div className="flex-1 space-y-2">
               <div className="aspect-square rounded-3xl border-4 border-amber-900 overflow-hidden shadow-2xl bg-white relative rotate-[-2deg]">
                 <img src={userData.photoUrl || ''} alt={userData.name} className="w-full h-full object-cover" />
                 <div className="absolute bottom-0 left-0 right-0 bg-amber-900/80 text-white text-[10px] font-bold text-center py-1">CONVIDADO VIP</div>
               </div>
               <p className="text-center font-fredoka font-bold text-amber-900 uppercase text-xs tracking-tighter">AMIGO: {userData.name}</p>
            </div>
            
            <div className="flex-none flex items-center justify-center pb-8">
              <span className="text-4xl">❤️</span>
            </div>

            <div className="flex-1 space-y-2">
               <div className="aspect-square rounded-3xl border-4 border-orange-600 overflow-hidden shadow-2xl bg-white relative rotate-[2deg]">
                 <img src={partyInfo.adolphoPhoto} alt="Adolpho" className="w-full h-full object-cover" />
                 <div className="absolute bottom-0 left-0 right-0 bg-orange-600 text-white text-[10px] font-bold text-center py-1 uppercase">O Ancião</div>
               </div>
               <p className="text-center font-fredoka font-bold text-orange-600 uppercase text-xs tracking-tighter tracking-widest">ADOLPHO</p>
            </div>
          </div>

          {/* Mensagem do Adolpho */}
          <div className="bg-white/60 p-5 rounded-3xl border-2 border-dashed border-orange-300 relative text-amber-950 font-medium text-lg leading-snug">
            <div className="absolute -top-3 left-6 bg-orange-600 text-white px-3 py-0.5 rounded-full text-[10px] font-black uppercase shadow-sm">
              Recado do aniversariante
            </div>
            <div className="pt-2 italic">
              "{userData.aiMessage}"
            </div>
          </div>

          {/* Dados da Festa */}
          <div className="grid grid-cols-1 gap-4 bg-amber-100/50 p-5 rounded-3xl border border-amber-200 shadow-inner">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📅</span>
              <div>
                <p className="text-[10px] uppercase font-black text-amber-700">Quando</p>
                <p className="font-bold text-amber-950 text-base leading-tight">{partyInfo.date}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">⏰</span>
              <div>
                <p className="text-[10px] uppercase font-black text-amber-700">Horário</p>
                <p className="font-bold text-amber-950 text-base leading-tight">{partyInfo.time}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">📍</span>
              <div>
                <p className="text-[10px] uppercase font-black text-amber-700">Local</p>
                <p className="font-bold text-amber-950 text-sm leading-tight">{partyInfo.location}</p>
              </div>
            </div>
          </div>

          {/* Regras */}
          <div className="space-y-1 pt-2 border-t border-amber-300">
            <div className="flex items-center gap-2 text-amber-900 font-black text-[10px] uppercase">
              <span className="bg-amber-900 text-white p-0.5 rounded">🦴</span>
              <span>Regras do Território:</span>
            </div>
            <ul className="text-amber-800 text-[11px] font-typewriter list-disc list-inside leading-tight pl-2">
              <li>Traga sua alegria e carinhos pro aniversariante.</li>
              <li>Se eu dormir, não reparem, a idade chega pra todos!</li>
            </ul>
          </div>
          
          <div className="text-center pb-2">
            <p className="font-fredoka font-black text-lg text-amber-950">ESPERO VOCÊ E SEU PET! 🐾</p>
          </div>
        </div>
      </div>

      {/* Ações - Escondidas na impressão */}
      <div className="no-print p-6 bg-[#3e2723] wood-texture border-t-4 border-[#5d4037] space-y-3">
        <Button 
          fullWidth 
          onClick={handleDownloadImage} 
          variant="primary" 
          disabled={isDownloading}
          className="shadow-[0_6px_0_rgb(154,52,18)] flex items-center justify-center gap-2"
        >
          {isDownloading ? "GERANDO..." : "💾 BAIXAR IMAGEM (PNG)"}
        </Button>
        <Button 
          fullWidth 
          onClick={handlePrint} 
          variant="secondary" 
          className="bg-amber-700 hover:bg-amber-800 text-white shadow-[0_6px_0_rgb(69,26,3)]"
        >
          🖨️ SALVAR COMO PDF / IMPRIMIR
        </Button>
        <button 
          onClick={onReset} 
          className="w-full text-orange-200/70 hover:text-white font-bold uppercase text-xs tracking-widest pt-2 transition-colors"
        >
          Fazer outro convite
        </button>
      </div>
    </div>
  );
};

export default InvitationStep;
