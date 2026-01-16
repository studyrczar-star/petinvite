
import React, { useState } from 'react';
import Button from './Button';
import { PawIcon, PARTY_DETAILS } from '../constants';

interface WelcomeStepProps {
  onNext: (name: string) => void;
}

const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onNext(name.trim());
    }
  };

  return (
    <div className="p-8 text-center space-y-6 bg-[#f4e4bc] parchment-texture min-h-[500px] flex flex-col justify-center border-b-8 border-[#5d4037]">
      {/* Avatar do Adolpho em destaque */}
      <div className="flex justify-center relative mb-4">
        <div className="w-40 h-40 rounded-full border-8 border-orange-500 overflow-hidden shadow-2xl z-10 bg-white">
          <img 
            src={PARTY_DETAILS.adolphoPhoto} 
            alt="Foto do Adolpho" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-4 bg-orange-600 text-white text-sm font-black px-6 py-2 rounded-full z-20 shadow-xl animate-bounce flex items-center gap-2">
          AU-AU! 🐾
        </div>
      </div>
      
      <div className="space-y-2">
        <h1 className="text-4xl font-fredoka font-black text-amber-900 leading-tight drop-shadow-sm">
          CONVOCAÇÃO DA MATILHA!
        </h1>
        <p className="text-xl text-amber-800 font-medium font-typewriter">
          O Adolpho faz 11 anos! <br/>
          Você é convidado VIP!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-[#5d4037]/5 p-6 rounded-3xl border-2 border-amber-300">
        <div className="space-y-2">
          <label className="block text-left font-fredoka text-amber-900 font-bold ml-1 uppercase text-sm tracking-widest">
            Digite seu nome, humano amigo:
          </label>
          <input
            type="text"
            required
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Seu Nome Aqui..."
            className="w-full px-6 py-4 rounded-2xl border-4 border-amber-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-200 outline-none text-2xl font-black transition-all bg-white text-amber-950 placeholder-amber-700/20 shadow-inner"
          />
        </div>

        <Button type="submit" fullWidth disabled={!name.trim()} className="py-5 text-2xl shadow-orange-900/40">
          ENTRAR NA FESTA! 🦴
        </Button>
      </form>

      <p className="text-sm text-amber-700 font-bold italic font-typewriter opacity-80">
        "O último rabo a balançar apaga a luz!"
      </p>
    </div>
  );
};

export default WelcomeStep;
