import {create} from "zustand"

const useItemStore = create((set) => ({
    perpus:[],
    setperpus:(data) => set(() => ({perpus:data})),

    kategori:[],
    setkategori:(data) => set(() => ({kategori:data})),

    buku:[],
    setbuku:(data) => set(() => ({buku:data})),
}))

export default useItemStore