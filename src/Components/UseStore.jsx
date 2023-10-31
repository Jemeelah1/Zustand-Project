import create from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      data: [],
      searchTerm: '',
      setData: (newData) => set({ data: newData }),
      setSearchTerm: (newTerm) => set({ searchTerm: newTerm }),
    }),
    { name: 'expense-tracker-app' }
  )
);

export default useStore;
