import { ShoppingContext, ShoppingDispatchContext } from "@/context";
import { useContext } from "react";

export const useShopping = () => {
  return useContext(ShoppingContext);
};

export const useShoppingDispatch = () => {
  return useContext(ShoppingDispatchContext);
};
