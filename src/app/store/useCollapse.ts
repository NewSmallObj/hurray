import { create } from 'zustand';
interface CollapseStore {
  collapse:boolean,
  setCollapse:(collapse: CollapseStore['collapse']) => void,
}

const useCollapse = create<CollapseStore>((set) => ({
  collapse:false,
  setCollapse: (collapse: CollapseStore['collapse']) => set({ collapse }),
}));

export default useCollapse;