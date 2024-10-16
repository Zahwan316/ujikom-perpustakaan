import {create} from "zustand"

const useStateStore = create((set) => ({
    filterrole:"0",
    setfilterrole:(data) => set(() => ({filterrole:data})),
    
    search:"",
    setsearch:(data) => set(() => ({search:data})),

    bukuid:"",
    setbukuid:(data) => set(() => ({bukuid:data})),

    typelogin:"login",
    settypelogin:(data) => set(() => ({typelogin:data})),
}))

export default useStateStore