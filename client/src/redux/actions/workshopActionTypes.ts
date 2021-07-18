export const GET_WORKSHOP_REQUEST = "GET_WORKSHOP_REQUEST"
export const GET_WORKSHOP_SUCCESS = "GET_WORKSHOP_SUCCESS"
export const GET_WORKSHOP_FAIL = "GET_WORKSHOP_FAIL"

export const GET_WORKSHOP_BY_CATEGORY = "GET_WORKSHOP_BY_CATEGORY"

export const RESET_WORKSHOP_LIST = "RESET_WORKSHOP_LIST";


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

export interface WorkshopLoading {
    type: typeof GET_WORKSHOP_REQUEST
}

export interface WorkshopFail {
    type: typeof GET_WORKSHOP_FAIL,
    payload: string
}

export interface WorkshopSuccess {
    type: typeof GET_WORKSHOP_SUCCESS,
    payload: Workshop[]
}

export interface WorkshopByCategory {
    type: typeof GET_WORKSHOP_BY_CATEGORY,
    payload:Workshop[]
}
export interface ResetWorkshopList {
    type: typeof RESET_WORKSHOP_LIST,
    
}

export type WorkshopDispatchTypes = WorkshopLoading | WorkshopFail | WorkshopSuccess | WorkshopByCategory | ResetWorkshopList
