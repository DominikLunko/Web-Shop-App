 export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";


export type Cart = {
    id: number,
    title: string,
    desc:string,
    price: number,
    date: string,
    category: string,
    userId: number,
    imageUrl: string,
    qty:number
    singleAdd:boolean
}


export interface AddToCart {
    type: typeof ADD_TO_CART,
    payload: Cart
}



export interface RemoveFromCart {
    type: typeof REMOVE_FROM_CART,
    payload:number
    
}


 export type CartDispatchTypes = AddToCart | RemoveFromCart
