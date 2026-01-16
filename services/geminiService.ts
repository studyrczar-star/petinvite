
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDogMessage = async (guestName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Escreva uma mensagem curta, divertida e fofa (máximo 150 caracteres) como se fosse o cachorrinho Adolpho convidando o(a) seu(sua) amigo(a) ${guestName} para sua festa de aniversário. Use trocadilhos de cachorro (au-au, lambeijos, patadas de alegria).`,
      config: {
        temperature: 0.9,
        topP: 0.8,
      }
    });

    return response.text || "Mal posso esperar para te ver e ganhar muitos carinhos! Au au! 🐾";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Vai ser uma festa de arromba! Traga sua alegria e venha comemorar comigo! Au au! 🐾";
  }
};
