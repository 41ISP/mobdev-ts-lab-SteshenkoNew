import { IPayment, TNewPayment } from "./types"

interface IPaymentsState {
    items: IPayment[]
    addPayment: (data: TNewPayment) => void
    removePayment: (id: string) => void
    togglePaid: (id: string) => void
}
