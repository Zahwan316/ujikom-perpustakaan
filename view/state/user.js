import {create} from "zustand"

const useUserStore = create((set) => ({
    user:[],
    setuser:(data) => set(() => ({user:data}))
}))

export default useUserStore