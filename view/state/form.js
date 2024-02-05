import {create} from "zustand"

const useFormStore = create((set) => ({
    form:{},
    setform:(name,value) => set((state) => ({form:{...state.form,[name]:value}})),
    resetform:() => set(() => ({form:""})),

    error:{},
    seterror:(data) => set(() => ({error:data})),

    formdetailbuku:{},
    setformdetailbuku:(name,value) => set((state) => ({formdetailbuku:{...state.formdetailbuku,[name]:value}})),
    resetformdetailbuku:() => set(() => ({form_detail_buku:""}))
}))

export default useFormStore