import {create} from "zustand"

const useUserStore = create((set) => ({
    user:[],
    setuser:(data) => set(() => ({user:data})),

    ref_user:[],
    setrefuser:(data) => set(() => ({ref_user:data}))
}))

export default useUserStore