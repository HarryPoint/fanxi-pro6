import { IProduct } from "@/types";
import { createContext, useReducer, ReactNode, Reducer, Dispatch } from "react";

type IState = {
  sizes: { value: string; selected: boolean }[];
  products: IProduct[];
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
};

const actionTypes = ["sizes:selected", "products:set"] as const;

type IAction = {
  type: (typeof actionTypes)[number];
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
