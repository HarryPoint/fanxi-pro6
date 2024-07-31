import { IProduct, IShoppingCartItem } from "@/types";
import { createContext, useReducer, ReactNode, Reducer, Dispatch } from "react";

type IState = {
  sizes: { value: string; selected: boolean }[];
  products: IProduct[];
  priceOrder: "asc" | "desc";
  shoppingCart: IShoppingCartItem[];
};

const initialState: IState = {
  sizes: [
    {
      value: "XS",
      selected: false,
    },
    {
      value: "S",
      selected: false,
    },
    {
      value: "M",
      selected: false,
    },
    {
      value: "ML",
      selected: false,
    },
    {
      value: "L",
      selected: false,
    },
    {
      value: "XL",
      selected: false,
    },
    {
      value: "XXL",
      selected: false,
    },
  ],
  products: [],
  priceOrder: "asc",
  shoppingCart: [],
};

const actionTypes = [
  "sizes:selected",
  "products:set",
  "priceOrder:set",
  "shoppingCart:add",
  "shoppingCart:delete",
  "shoppingCart:quantity",
] as const;

type IAction = {
  type: (typeof actionTypes)[number];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
};

const shoppingReducer: Reducer<IState, IAction> = (state, action) => {
  switch (action.type) {
    case "sizes:selected":
      return {
        ...state,
        sizes: state.sizes.map((size) => {
          if (size.value === action.payload) {
            return {
              ...size,
              selected: !size.selected,
            };
          }
          return size;
        }),
      };

    case "products:set":
      return {
        ...state,
        products: action.payload,
      };
    case "priceOrder:set":
      return {
        ...state,
        priceOrder: action.payload,
      };
    case "shoppingCart:add":
      return {
        ...state,
        shoppingCart: state.shoppingCart.some(
          (item) => item.key === action.payload.key
        )
          ? state.shoppingCart.map((item) => {
              if (item.key === action.payload.key) {
                return {
                  ...item,
                  quantity: item.quantity + 1,
                };
              }
              return item;
            })
          : state.shoppingCart.concat(action.payload),
      };
    case "shoppingCart:delete":
      return {
        ...state,
        shoppingCart: state.shoppingCart.filter(
          (item) => item.key !== action.payload
        ),
      };
    case "shoppingCart:quantity":
      return {
        ...state,
        shoppingCart: state.shoppingCart.map((item) => {
          if (item.key === action.payload.key) {
            return {
              ...item,
              quantity: action.payload.quantity,
            };
          }
          return item;
        }),
      };
    default: {
      return state;
    }
  }
};

export const ShoppingContext = createContext<IState>(initialState);
export const ShoppingDispatchContext = createContext<Dispatch<IAction>>(
  (a) => a
);

export const ShoppingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [shopping, dispatch] = useReducer(shoppingReducer, initialState);

  return (
    <ShoppingContext.Provider value={shopping}>
      <ShoppingDispatchContext.Provider value={dispatch}>
        {children}
      </ShoppingDispatchContext.Provider>
    </ShoppingContext.Provider>
  );
};
