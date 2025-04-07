import { create } from 'zustand';

type TaskState = {
  isCheckInCompleted: boolean;
  completeCheckIn: () => void;
  resetCheckIn: () => void;
};

export const useTaskStore = create<TaskState>((set) => ({
  isCheckInCompleted: false,
  completeCheckIn: () => set({ isCheckInCompleted: true }),
  resetCheckIn: () => set({ isCheckInCompleted: false }),
}));
