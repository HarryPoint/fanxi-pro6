import { useShopping, useShoppingDispatch } from "@/hooks";
import classNames from "classnames";

const SizeSelector = () => {
  const { sizes } = useShopping();
  const dispatch = useShoppingDispatch();
  return (
    <div className="container px-10 mx-auto flex items-center gap-1 py-2">
      <h3 className="shrink-0">尺寸：</h3>
      <div className="flex gap-2">
        {sizes.map((size) => (
          <div
            key={size.value}
            className={classNames(
              [
                "rounded-full",
                "bg-gray-200",
                "w-7",
                "aspect-square",
                "text-sm",
                "text-center",
                "flex",
                "justify-center",
                "items-center",
                "cursor-pointer",
              ],
              {
                "bg-gray-950": size.selected,
                "text-white": size.selected,
              }
            )}
            onClick={() =>
              dispatch({ type: "sizes:selected", payload: size.value })
            }
          >
            <div>{size.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PriceOrderSelector = () => {
  const { priceOrder } = useShopping();
  const dispatch = useShoppingDispatch();
  const priceOrderText = (order: string) => {
    if (order === "asc") {
      return "按价格升序";
    }
    return "按价格降序";
  };
  return (
    <div className="container px-10 mx-auto flex items-center gap-1 py-2">
      <h3 className="shrink-0">价格：</h3>
      <div className="flex">
        <div className="pointer-events-auto flex divide-x divide-slate-400/20 overflow-hidden rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10">
          {["asc", "desc"].map((order) => (
            <div
              key={order}
              className={classNames(
                [
                  "px-4",
                  "py-2",
                  "transition",
                  "hover:bg-gray-700",
                  "hover:text-white",
                  "cursor-pointer",
                ],
                {
                  "bg-gray-900": priceOrder === order,
                  "text-white": priceOrder === order,
                }
              )}
              onClick={() =>
                dispatch({ type: "priceOrder:set", payload: order })
              }
            >
              {priceOrderText(order)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProductsFilters = () => {
  return (
    <div>
      <SizeSelector />
      <PriceOrderSelector />
    </div>
  );
};

export default ProductsFilters;
