
import React from 'react';
import { PartyInfo } from './types';

export const PARTY_DETAILS: PartyInfo = {
  date: '16 de Janeiro (Sexta-feira - dia de maldade!)',
  time: 'Das 18:45 até as 02h',
  location: 'Na Toca do Adolpho - Maringá/PR',
  locationUrl: 'https://www.google.com/maps/search/Maringá+PR',
  // Foto fiel: Pomerânia marrom/laranja (Lulu)
  adolphoPhoto: 'https://i.ibb.co/Gv1d0LRp/image.png'
};

export const COLORS = {
  wood: 'bg-[#5d4037]',
  parchment: 'bg-[#f4e4bc]',
  accent: 'text-[#e65100]',
  paper: 'bg-[#fdf6e3]'
};

export const PawIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 11c-1.38 0-2.5-1.12-2.5-2.5S10.62 6 12 6s2.5 1.12 2.5 2.5S13.38 11 12 11zm-5.5-1C5.12 10 4 8.88 4 7.5S5.12 5 6.5 5 9 6.12 9 7.5 7.88 10 6.5 10zm11 0c-1.38 0-2.5-1.12-2.5-2.5S16.12 5 17.5 5s2.5 1.12 2.5 2.5S18.88 10 17.5 10zm-11 7c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm11 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-5.5 2c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
  </svg>
);
