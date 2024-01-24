import {create} from "zustand"

const useItemStore = create((set) => ({
    perpus:[],
    setperpus:(data) => set(() => ({perpus:data}))
}))

export default useItemStore