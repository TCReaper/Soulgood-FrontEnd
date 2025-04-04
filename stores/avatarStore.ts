// avatarStore.ts
import { create } from 'zustand';

type AvatarSelections = Record<string, string | null>;

interface AvatarState {
  selections: AvatarSelections;
  setSelections: (newSelections: AvatarSelections) => void;
  useAvatar: boolean;
  setUseAvatar: (value: boolean) => void;
}

export const useAvatarStore = create<AvatarState>((set) => ({
  selections: {},
  useAvatar: false, // default to false
  setSelections: (newSelections) => set({ selections: newSelections }),
  setUseAvatar: (value) => set({ useAvatar: value }),
}));
