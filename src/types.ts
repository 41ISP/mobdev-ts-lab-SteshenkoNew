export type TCategory = "video" | "apps" | "mobile" | "learning" | "other"

export type TNewPayment = Omit<IPayment, "id" | "paid">

export interface IPayment {
    id: string,
    title: string,
    amount: number,
    due: string,
    paid: boolean,
    category?: TCategory
}

export type INewPayment = TNewPayment