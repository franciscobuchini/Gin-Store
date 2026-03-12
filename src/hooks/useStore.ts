import { create } from 'zustand';

interface FilterState {
  hasStockFilters: boolean;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  initializeCategories: (categories: string[]) => void;
}

export const useStore = create<FilterState>((set) => ({
  hasStockFilters: true,
  activeCategory: 'Todos', // Default category
  setActiveCategory: (category) => set({ activeCategory: category }),
  initializeCategories: (categories) => {
    // Try to keep the current active category if it exists in the new list,
    // or if it's the generic "Todos" view.
    // otherwise default to 'Todos'
    set((state) => {
        if (state.activeCategory !== 'Todos' && !categories.includes(state.activeCategory) && categories.length > 0) {
            return { activeCategory: 'Todos' };
        }
        return state;
    });
  }
}));
