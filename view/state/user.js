import {create} from "zustand"

const useUserStore = create(() => ({
    user:[],
    setuser:(data) => set(() => ({user:data}))
}))

export default useUserStore