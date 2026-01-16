
export enum AppStep {
  WELCOME = 'WELCOME',
  CAMERA = 'CAMERA',
  GENERATING = 'GENERATING',
  INVITATION = 'INVITATION'
}

export interface UserData {
  name: string;
  photoUrl: string | null;
  aiMessage: string;
}

export interface PartyInfo {
  date: string;
  time: string;
  location: string;
  locationUrl: string;
  adolphoPhoto: string;
}
