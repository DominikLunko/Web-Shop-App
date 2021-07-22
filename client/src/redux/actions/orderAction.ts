import axios from "axios";
import { Dispatch } from "react";
import { Cart } from "./cartActionTypes";
import {
  CREATE_ORDER,
  Order,
  OrderDispatchTypes,
  Product,
} from "./orderActionTypes";

import * as API from "../../api";
import { removeFromCart } from "./cartActions";

export const createOrder =
  () => async (dispatch: Dispatch<OrderDispatchTypes>, getState: any) => {
    // const { data } = await axios.get(`/api/products/${id}`);
    const products = getState().cart.products;
    let copy_product: Product[] = [];
    products.map((product: Cart) => {
      const { fromCart, ...copy } = product;
      copy_product.push(copy);
    });
    const total = products.reduce(
      (price: number, item: Product) => item.price * item.qty + price,
      0
    );

    const order: Order = {
      products: copy_product,
      total: total,
    };
    console.log(copy_product);
    await API.createOrder(order);
    // dispatch({
    //     type: CREATE_ORDER,
    //     payload: {
    //         ...cartElem,
    //         qty,
    //         fromCart:fromCart
    //     }
    // })
  };
