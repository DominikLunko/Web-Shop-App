export const GET_WORKSHOP_DETAILS_REQUEST = "GET_WORKSHOP_DETAILS_REQUEST"
export const GET_WORKSHOP_DETAILS_SUCCESS = "GET_WORKSHOP_DETAILS_SUCCES"
export const GET_WORKSHOP_DETAILS_FAIL = "GET_WORKSHOP_DETAILS_FAIL"


export type Workshop = {
    id: number,
    title: string,
    desc:string,
    price: number,
    date: string,
    category: string,
    userId: number,
    imageUrl: string,
}
export type User = {
    email: string,
    password: string,
    id:number,
    name:string,
}
export interface WorkshopDetailsLoading {
    type: typeof GET_WORKSHOP_DETAILS_REQUEST
}

export interface WorkshopDetailsFail {
    type: typeof GET_WORKSHOP_DETAILS_FAIL,
    payload: string
}

export interface WorkshopDetailsSuccess {
    type: typeof GET_WORKSHOP_DETAILS_SUCCESS,
    payload: {
        workshop:Workshop,
        user:User
    }
}

export type WorkshopDetailsDispatchTypes = WorkshopDetailsLoading | WorkshopDetailsFail | WorkshopDetailsSuccess
