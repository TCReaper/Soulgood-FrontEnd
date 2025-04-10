import { create } from 'zustand';

type TaskState = {
  isTutorialCompleted: boolean;
  completeTutorial: () => void;
  isCheckInCompleted: boolean;
  completeCheckIn: () => void;
  resetCheckIn: () => void;
};

export const useTaskStore = create<TaskState>((set) => ({
  isTutorialCompleted: false,
  completeTutorial: () => set({ isTutorialCompleted: true }),
  isCheckInCompleted: false,
  completeCheckIn: () => set({ isCheckInCompleted: true }),
  resetCheckIn: () => set({ isCheckInCompleted: false }),
}));
