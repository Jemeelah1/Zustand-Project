// state.js
import create from 'zustand';

export const useFormulaStore = create((set) => ({
  formula: '',
  setFormula: (newFormula) => set({ formula: newFormula }),
}));
