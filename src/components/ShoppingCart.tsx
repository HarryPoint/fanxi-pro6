import { useShopping, useShoppingDispatch } from "@/hooks";
import Icon from "./Icon";
import { IShoppingCartItem } from "@/types";
import { useMemo } from "react";

const ShoppingItem: React.FC<{ data: IShoppingCartItem }> = (props) => {
  const { data } = props;
  const dispatch = useShoppingDispatch();
  const { products } = useShopping();
  const productId = useMemo(() => data.productId, [data]);
  const productsInfo = useMemo(() => {
    return products.find((product) => product.id === productId);
  }, [products, productId]);
  return (
    productsInfo && (
      <div className="border-t-px grid grid-cols-12 items-center *:py-2">
        <div className="col-span-3">
          <img
            className="w-full aspect-1/2 object-cover"
            src={productsInfo?.img}
            alt=""
          />
        </div>
        <div className="col-span-8 text-sm px-2">
          <div className="leading-6 min-h-[calc(2*1.5rem)]">
            {productsInfo?.title}
          </div>
          <div className="w-4/5 text-xs text-ellipsis text-nowrap overflow-hidden">
            {data.size}|{productsInfo.style}
          </div>
          <div>{productsInfo?.currencyFormat + productsInfo?.price}</div>
          <div>
            数量：
            <input
              className="w-10 text-black text-center"
              type="text"
              value={data.quantity}
              onChange={(e) => {
                const quantity = Number(e.target.value);
                if (isNaN(quantity) || quantity < 1) {
                  return;
                }
                dispatch({
                  type: "shoppingCart:quantity",
                  payload: {
                    key: data.key,
                    quantity: Number(e.target.value),
                  },
                });
              }}
            />
          </div>
        </div>
        <div className="col-span-1 text-center">
          <Icon
            type="icon-close"
            className=""
            onClick={() =>
              dispatch({ type: "shoppingCart:delete", payload: data.key })
            }
          />
        </div>
      </div>
    )
  );
};

const ShoppingCart = () => {
  const { shoppingCart } = useShopping();
  return (
    <div className="fixed left-0 w-screen h-screen top-0 flex justify-end">
      <div className="w-3/4 bg-gray-800 text-white relative flex">
        <div className="divide-y flex flex-col items-stretch flex-grow">
          <div className="container px-2 flex items-center gap-3 leading-10">
            <div>
              <Icon type="icon-close" />
            </div>
            <div>购物车</div>
          </div>
          <div className="flex-grow relative">
            <div className="absolute px-2 w-full h-full overflow-scroll">
              <div className="divide-y divide-gray-600">
                {shoppingCart.map((item) => (
                  <ShoppingItem key={item.key} data={item} />
                ))}
              </div>
            </div>
          </div>
          <div className="px-2">
            <div className="flex justify-between items-center py-3">
              <div>小计</div>
              <div>$18.00</div>
            </div>
            <div>
              <button className="bg-black w-full leading-10">结算</button>
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 -translate-x-full bg-inherit w-10 aspect-square flex justify-center items-center">
          <Icon type="icon-shopping" className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
