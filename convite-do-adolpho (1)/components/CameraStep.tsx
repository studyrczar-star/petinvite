
import React, { useRef, useState, useEffect, useCallback } from 'react';
import Button from './Button';
import { PARTY_DETAILS } from '../constants';

interface CameraStepProps {
  guestName: string;
  onCapture: (photo: string) => void;
  onBack: () => void;
}

const CameraStep: React.FC<CameraStepProps> = ({ guestName, onCapture, onBack }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const constraints = {
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      };
      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
      setStream(newStream);
      setError(null);
    } catch (err) {
      console.error("Camera access error:", err);
      setError("Ops! Não conseguimos acessar sua câmera. Por favor, permita o acesso para continuar.");
    }
  }, []);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(dataUrl);
      }
    }
  };

  const handleConfirm = () => {
    if (capturedImage) {
      onCapture(capturedImage);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  return (
    <div className="p-6 text-center space-y-6 bg-[#f4e4bc] parchment-texture min-h-[500px] flex flex-col justify-center">
      <div className="space-y-2">
        <div className="flex justify-center mb-2">
           <img src={PARTY_DETAILS.adolphoPhoto} className="w-16 h-16 rounded-full border-2 border-orange-500 shadow-lg" alt="Mini Adolpho" />
        </div>
        <h2 className="text-3xl font-fredoka font-black text-amber-900 leading-tight">SORRIA PARA O ADOLPHO!</h2>
        <p className="text-amber-800 font-medium font-typewriter italic">Ei {guestName}, vamos tirar uma foto para o seu convite VIP.</p>
      </div>

      <div className="relative aspect-square w-full bg-[#5d4037] rounded-3xl overflow-hidden shadow-2xl border-8 border-white/50 ring-4 ring-amber-200">
        {!capturedImage ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover -scale-x-100"
            />
            {error && (
              <div className="absolute inset-0 flex items-center justify-center p-8 bg-red-50/90 text-red-600 text-center font-bold">
                {error}
              </div>
            )}
          </>
        ) : (
          <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <div className="flex flex-col gap-3">
        {!capturedImage ? (
          <Button onClick={takePhoto} fullWidth disabled={!!error} className="shadow-orange-900/40">
            📸 TIRAR FOTO!
          </Button>
        ) : (
          <>
            <Button onClick={handleConfirm} fullWidth variant="primary" className="shadow-orange-900/40">
              FICOU ÓTIMA! CONTINUAR ✨
            </Button>
            <Button onClick={handleRetake} fullWidth variant="secondary" className="shadow-yellow-900/40">
              TENTAR DE NOVO 🔄
            </Button>
          </>
        )}
        <button onClick={onBack} className="text-amber-700 font-black uppercase text-xs tracking-widest hover:text-amber-900 transition-colors py-2 no-print">
          VOLTAR E EDITAR NOME
        </button>
      </div>
    </div>
  );
};

export default CameraStep;
