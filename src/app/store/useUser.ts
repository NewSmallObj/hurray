import { create } from 'zustand';
import { DictType } from '../_api/sys/dict';
import { MenuType } from '../_api/sys/menu';
import { UserType } from '../_api/sys/user';
interface UserStore {
  dic:{[key:string]:DictType[]},
  currentUser:Partial<UserType>
  menuTree:MenuType[]
  permsList:string[]
  route_map:any
  setDic:(dic: UserStore['dic']) => void,
  setCurrentUser:(currentUser: UserStore['currentUser']) => void,
  setMenuTree:(menuTree: UserStore['menuTree']) => void,
  setPermsList:(permsList: UserStore['permsList']) => void,
  setRouteMap:(route_map: UserStore['route_map']) => void
}

const useUser = create<UserStore>((set) => ({
  dic:{},
  currentUser:{},
  menuTree:[],
  permsList:[],
  route_map:{},
  setDic: (dic: UserStore['dic']) => set({ dic }),
  setCurrentUser: (currentUser: UserStore['currentUser']) => set({ currentUser }),
  setMenuTree: (menuTree: UserStore['menuTree']) => set({ menuTree }),
  setPermsList: (permsList: UserStore['permsList']) => set({ permsList }),
  setRouteMap: (route_map: UserStore['route_map']) => set({ route_map }),
}));

export default useUser;