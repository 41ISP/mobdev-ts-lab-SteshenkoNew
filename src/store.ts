import { create } from "zustand"
import { IPayment, TNewPayment } from "./types"
import { createJSONStorage, persist } from "zustand/middleware"
import { nanoid } from "nanoid"

interface IPaymentsState {
    items: IPayment[]
    addPayment: (data: TNewPayment) => void
    removePayment: (id: string) => void
    togglePaid: (id: string) => void
}

export const usePaymentsStore = create<IPaymentsState>()(
    persist(
        (set) => ({
            items: [],
            addPayment: (data) =>
                set((state) => ({ items: [...state.items,{...data,id: nanoid(), paid: false},], })),
            removePayment: (id) =>
                set((state) => ({
                    items: state.items.map((p) => 
                        p.id === id ? ...p, paid, !p.paid) :p,),
                })),
        }),
        { name: "payments", storage: createJSONStorage(() => localStorage)
        },
    ),
)