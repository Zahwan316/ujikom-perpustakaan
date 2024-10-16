import {create} from "zustand"

const useItemStore = create((set) => ({
    perpus:[],
    setperpus:(data) => set(() => ({perpus:data})),

    kategori:[],
    setkategori:(data) => set(() => ({kategori:data})),

    buku:[],
    setbuku:(data) => set(() => ({buku:data})),

    peminjaman:[],
    setpeminjaman:(data) => set(() => ({peminjaman:data})),

    ref_peminjaman:[],
    setref_peminjaman:(data) => set(() => ({ref_peminjaman:data})),

    user:[],
    setuser:(data) => set(() => ({user:data})),

    ulasan:[],
    setulasan:(data) => set(() => ({ulasan:data})),

    koleksi:[],
    setkoleksi:(data) => set(() => ({koleksi:data})),

    message:[],
    setmessage:(data) => set(() => ({message:data})),

    laporan:[],
    setlaporan:(data) => set(() => ({laporan:data})),
}))

export default useItemStore