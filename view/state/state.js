import {create} from "zustand"

const useStateStore = create((set) => ({
    filterrole:"0",
    setfilterrole:(data) => set(() => ({filterrole:data}))
}))

export default useStateStore